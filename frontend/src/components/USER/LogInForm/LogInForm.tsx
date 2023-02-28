import { email, password } from '@/utils/validateAuthInputs';
import { FormikHelpers, useFormik } from 'formik';
import { isLoggedInVar } from '@/graphql/cache';
import { LOG_IN } from '@/graphql/queries/user';
import { object } from 'yup';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UserCtx } from '@/context/User';
import { useRouter } from 'next/router';
import Button from '@/components/COMMON/Button/Button';
import FormInput from '@/components/COMMON/FormInput/FormInput';
import Link from 'next/link';
import Notice from '@/components/COMMON/Notice/Notice';
import parseGQLErrors from '@/utils/parseGQLErrors';
import styled from 'styled-components';
import type { ApolloError } from '@apollo/client';
import type { FC } from 'react';
import type { User } from '@/models/index';

interface Props {
  close?: () => void;
}

interface Data {
  logIn: User;
}

type HandleSubmit = (
  formikHelpers: FormikHelpers<{ logInEmail: string; logInPassword: string }>,
  values: { logInEmail: string; logInPassword: string }
) => void;

const validationSchema = object().shape({
  logInEmail: email,
  logInPassword: password
});

const LogInForm: FC<Props> = ({ close }) => {
  const [apolloError, setApolloError] = useState<ApolloError>();

  const { setUser } = useContext(UserCtx);

  const router = useRouter();

  const onCompleted = (data: Data) => {
    if (data.logIn) {
      setUser(data.logIn);

      isLoggedInVar(!!data.logIn);

      // localStorage.setItem('userId', data.logIn.user.id);
    }

    // when logging in from /login page
    if (!close) router.push('/');
  };

  const [logIn, { loading }] = useMutation(LOG_IN, {
    fetchPolicy: 'network-only',

    onCompleted: data => onCompleted(data),

    onError: error => setApolloError(error)
  });

  const handleSubmit: HandleSubmit = async (formikHelpers, values) => {
    await logIn({
      variables: { email: values.logInEmail, password: values.logInPassword }
    });

    formikHelpers.resetForm();

    formikHelpers.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: { logInEmail: 'user@email.com', logInPassword: 'user123$' },

    validationSchema,

    onSubmit: (values, formikHelpers) => handleSubmit(formikHelpers, values)
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        id='logInEmailId'
        label='Email'
        type='email'
        {...formik.getFieldProps('logInEmail')}
      />

      {formik.touched.logInEmail && formik.errors.logInEmail && (
        <Notice type='error'>{formik.errors.logInEmail}</Notice>
      )}

      <FormInput
        id='logInPasswordId'
        label='Password'
        type='password'
        {...formik.getFieldProps('logInPassword')}
      />

      {formik.touched.logInPassword && formik.errors.logInPassword && (
        <Notice type='error'>{formik.errors.logInPassword}</Notice>
      )}

      {apolloError && (
        <Notice type='error'>{parseGQLErrors(apolloError)}</Notice>
      )}

      <Buttonn
        disabled={
          !!(
            !formik.values.logInEmail ||
            !formik.values.logInPassword ||
            formik.errors.logInEmail ||
            formik.errors.logInPassword ||
            formik.isSubmitting
          )
        }
        loading={loading}
        name='logIn'
        type='submit'
      >
        Log in
      </Buttonn>

      <LogInLinks>
        <Linkk href='/reqpassreset' passHref>
          Reset Password
        </Linkk>

        <Linkk href='/signup' passHref>
          Create account
        </Linkk>
      </LogInLinks>
    </Form>
  );
};

export default LogInForm;

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
  margin: 0.5rem 0;
`;

export const LogInLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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