import { FC, useState } from 'react';
import Link from 'next/link';
import { ApolloError, useMutation } from '@apollo/client';
import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { email } from '@/utils/validateAuthInputs';
import { PASS_RESET_REQ } from '@/graphql/queries/user';
import Button from '@/components/REUSEABLE/Button/Button';
import displayMessages from '@/constants/displayMessages';
import Error from '@/components/REUSEABLE/Error/Error';
import FormInput from '@/components/REUSEABLE/FormInput/FormInput';
import Status from '@/components/REUSEABLE/Status/Status';

type HandleSubmit = (
  formikHelpers: FormikHelpers<{ passResetReqEmail: string }>,
  values: { passResetReqEmail: string }
) => void;

const validationSchema = object().shape({ passResetReqEmail: email });

const PassResetReq: FC = () => {
  const [apolloError, setApolloError] = useState<ApolloError>();

  const [success, setSuccess] = useState(false);

  const [passResetReq, { error, loading }] = useMutation(PASS_RESET_REQ, {
    fetchPolicy: 'network-only',

    onCompleted: () => setSuccess(true),

    onError: error => setApolloError(error)
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

      {formik.touched.passResetReqEmail && formik.errors.passResetReqEmail && (
        <Error error={formik.errors.passResetReqEmail} />
      )}

      {apolloError && <Error error={apolloError} />}

      {success && (
        <Status status='success'>{displayMessages.user.passReset.sent}</Status>
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

      <Linkk href='/login' passHref>
        Log in
      </Linkk>
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

const Linkk = styled(Link)`
  /* align-self: flex-start; */
  /* cursor: pointer; */
  font-size: ${props => props.theme.fontSize.small};
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
