import { FC } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { email } from '../../utils/AuthInputValidation';
import { REQ_PASS_RESET } from '../../graphql/queries/user';
import Button from '../REUSEABLE/Button';
import displayMessages from '../../constants/displayMessages';
import DisplayStatus from '../REUSEABLE/DisplayStatus';
import FormInput from '../REUSEABLE/FormInput';
import graphQLErrors from '../../utils/graphQLErrors';

type HandleSubmit = (
  formikHelpers: FormikHelpers<{ reqPassResetEmail: string }>,
  values: { reqPassResetEmail: string }
) => void;

const validationSchema = object().shape({ reqPassResetEmail: email });

const ReqPassReset: FC = () => {
  const [reqPassReset, { loading, error, data, called }] = useMutation(
    REQ_PASS_RESET,
    { fetchPolicy: 'network-only' }
  );

  const handleSubmit: HandleSubmit = async (formikHelpers, values) => {
    try {
      await reqPassReset({ variables: { email: values.reqPassResetEmail } });

      formikHelpers.resetForm();

      formikHelpers.setSubmitting(false);
    } catch (error) {
      // console.log('ReqPassReset handleSubmit error: ', error);
    }
  };

  const formik = useFormik({
    initialValues: { reqPassResetEmail: 'user@email.com' },

    validationSchema,

    onSubmit: (values, formikHelpers) => handleSubmit(formikHelpers, values)
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        id='reqPassResetEmailId'
        label='Email'
        type='email'
        {...formik.getFieldProps('reqPassResetEmail')}
      />

      {formik.touched.reqPassResetEmail && formik.errors.reqPassResetEmail ? (
        <DisplayStatus status='error'>
          {formik.errors.reqPassResetEmail}
        </DisplayStatus>
      ) : null}

      {error && (
        <DisplayStatus status='error'>{graphQLErrors(error)}</DisplayStatus>
      )}

      {!loading && !error && called && data && data.reqPassReset && (
        <DisplayStatus status='success'>
          {displayMessages.success.user.ReqPassReset}
        </DisplayStatus>
      )}

      <Buttonn
        disabled={
          !!(
            !formik.values.reqPassResetEmail ||
            formik.errors.reqPassResetEmail ||
            formik.isSubmitting
          )
        }
        name='passwordReset'
        type='submit'
      >
        Submit
      </Buttonn>

      <Link href='/login' passHref>
        <A>Log in</A>
      </Link>
    </Form>
  );
};

export default ReqPassReset;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > input {
    margin-bottom: 0.5rem;
  }
`;

const Buttonn = styled(Button)`
  align-self: flex-end;
`;

const A = styled.a`
  align-self: flex-start;
  cursor: pointer;
  font-size: ${props => props.theme.fontSize.small};
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
