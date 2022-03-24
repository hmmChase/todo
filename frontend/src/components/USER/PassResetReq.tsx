import { FC, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { email } from '../../utils/validateAuthInputs';
import { PASS_RESET_REQ } from '../../graphql/queries/user';
import Button from '../REUSEABLE/Button';
import displayMessages from '../../constants/displayMessages';
import DisplayStatus from '../REUSEABLE/DisplayStatus';
import FormInput from '../REUSEABLE/FormInput';
import graphQLErrors from '../../utils/graphQLErrors';

type HandleSubmit = (
  formikHelpers: FormikHelpers<{ passResetReqEmail: string }>,
  values: { passResetReqEmail: string }
) => void;

const validationSchema = object().shape({ passResetReqEmail: email });

const PassResetReq: FC = () => {
  const [success, setSuccess] = useState(false);

  const [passResetReq, { error, loading }] = useMutation(PASS_RESET_REQ, {
    fetchPolicy: 'network-only',

    onCompleted: () => setSuccess(true)
  });

  const handleSubmit: HandleSubmit = async (formikHelpers, values) => {
    await passResetReq({ variables: { email: values.passResetReqEmail } });

    formikHelpers.resetForm();

    formikHelpers.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: { passResetReqEmail: 'user@email.com' },

    validationSchema,

    onSubmit: (values, formikHelpers) => handleSubmit(formikHelpers, values)
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        id='passResetReqEmail'
        label='Email'
        type='email'
        {...formik.getFieldProps('passResetReqEmail')}
      />

      {formik.touched.passResetReqEmail && formik.errors.passResetReqEmail ? (
        <DisplayStatus status='error'>
          {formik.errors.passResetReqEmail}
        </DisplayStatus>
      ) : null}

      {error && (
        <DisplayStatus status='error'>{graphQLErrors(error)}</DisplayStatus>
      )}

      {success && (
        <DisplayStatus status='success'>
          {displayMessages.user.passReset.sent}
        </DisplayStatus>
      )}

      <Buttonn
        disabled={
          !!(
            !formik.values.passResetReqEmail ||
            formik.errors.passResetReqEmail ||
            formik.isSubmitting
          )
        }
        loading={loading}
        name='passReset'
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

export default PassResetReq;

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
