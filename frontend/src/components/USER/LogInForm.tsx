import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { email, password } from '../../utils/AuthInputValidation';
import graphQLErrors from '../../utils/graphQLErrors';
import { LOG_IN, IS_LOGGED_IN } from '../../graphql/queries/user';
import { isLoggedInVar } from '../../graphql/cache';
import FormInput from '../REUSEABLE/FormInput';
import Button from '../REUSEABLE/Button';
import DisplayStatus from '../REUSEABLE/DisplayStatus';

interface Props {
  close?: () => void;
}

const validationSchema = object().shape({
  logInEmail: email,
  logInPassword: password
});

const LogInForm: FC<Props> = props => {
  const { close } = props;

  const router = useRouter();

  // const apolloClient = useApolloClient();

  const update = (cache, data) => {
    // const isLoggedIn = !!data?.logIn?.user?.id;
    // cache.writeQuery({
    //   id: 'isLoggedIn',
    //   query: IS_LOGGED_IN,
    //   data: { isLoggedIn }
    // });
  };

  const onCompleted = async data => {
    // apolloClient.resetStore();

    // localStorage.setItem('userId', data.logIn.user.id);

    isLoggedInVar(true);

    if (close) close();
    else await router.push('/');
  };

  const [logIn, { loading, error }] = useMutation(LOG_IN, {
    fetchPolicy: 'network-only',

    update: (cache, data) => update(cache, data),

    onCompleted: data => onCompleted(data)
  });

  const handleSubmit = async (values, formikHelpers) => {
    // const email = e.currentTarget.elements.email.value;

    // const password = e.currentTarget.elements.password.value;

    try {
      await logIn({
        variables: { email: values.logInEmail, password: values.logInPassword }
      });

      formikHelpers.resetForm();

      formikHelpers.setSubmitting(false);
    } catch (error) {
      // console.log('LogIn handleSubmit error: ', error);
    }
  };

  const formik = useFormik({
    initialValues: { logInEmail: 'user@email.com', logInPassword: 'user123$' },

    validationSchema,

    // validateOnChange: false,
    // validateOnBlur: true,

    onSubmit: (values, formikHelpers) => handleSubmit(values, formikHelpers)
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        label='Email'
        id='logInEmailId'
        type='email'
        {...formik.getFieldProps('logInEmail')}
      />

      {formik.touched.logInEmail && formik.errors.logInEmail ? (
        <DisplayStatus status='error'>{formik.errors.logInEmail}</DisplayStatus>
      ) : null}

      <FormInput
        label='Password'
        id='logInPasswordId'
        type='password'
        {...formik.getFieldProps('logInPassword')}
      />

      {formik.touched.logInPassword && formik.errors.logInPassword ? (
        <DisplayStatus status='error'>
          {formik.errors.logInPassword}
        </DisplayStatus>
      ) : null}

      {error && (
        <DisplayStatus status='error'>{graphQLErrors(error)}</DisplayStatus>
      )}

      <Buttonn
        aria-label='submit log in'
        type='submit'
        loading={loading}
        disabled={
          !!(
            !formik.values.logInEmail ||
            !formik.values.logInPassword ||
            formik.errors.logInEmail ||
            formik.errors.logInPassword ||
            formik.isSubmitting
          )
        }
      >
        Log in
      </Buttonn>

      <LogInLinks>
        <Link href='/reqpassreset' passHref>
          <A>Reset Password</A>
        </Link>

        <Link href='/signup' passHref>
          <A>Create account</A>
        </Link>
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
  margin-bottom: 1rem;
`;

export const LogInLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
