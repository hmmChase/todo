import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import type { ApolloError } from '@apollo/client';

import { email } from '@/utils/validateAuthInputs';
import { PASS_RESET_REQ } from '@/graphql/queries/user';
import Button from '@/components/COMMON/Button/Button';
import displayMsg from '@/constants/displayMsg';
import FormInput from '@/components/COMMON/FormInput/FormInput';
import Notice from '@/components/COMMON/Notice/Notice';
import parseGQLErrors from '@/utils/parseGQLErrors';

type HandleSubmit = (
  formikHelpers: FormikHelpers<{ passResetReqEmail: string }>,
  values: { passResetReqEmail: string }
) => void;

const validationSchema = object().shape({ passResetReqEmail: email });

const PassResetReq = () => {
  const [apolloError, setApolloError] = useState<ApolloError>();

  const [success, setSuccess] = useState(false);

  const [passResetReq, { loading }] = useMutation(PASS_RESET_REQ, {
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
        <Notice type='error'>{formik.errors.passResetReqEmail}</Notice>
      )}

      {apolloError && (
        <Notice type='error'>{parseGQLErrors(apolloError)}</Notice>
      )}

      {success && (
        <Notice type='success'>{displayMsg.user.passReset.sent}</Notice>
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
