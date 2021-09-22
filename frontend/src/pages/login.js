import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';
import { object } from 'yup';
import styled from 'styled-components';
import { useFormik } from 'formik';

import { LOG_IN } from '../graphql/queries/user';
import { isLoggedInVar } from '../graphql/cache';
import graphQLErrors from '../utils/graphQLErrors';
import Layout from '../components/LAYOUTS/Layout';
import FormInput from '../components/REUSEABLE/FormInput';
import Button from '../components/REUSEABLE/Button';
import DisplayError from '../components/OTHER/DisplayError';

import { email, password } from '../utils/AuthInputValidation';

const validationSchema = object().shape({
  logInEmail: email,
  logInPassword: password
});

const LogInPage = () => {
  const [errorMsg, setErrorMsg] = useState();

  const router = useRouter();

  const apolloClient = useApolloClient();

  const [logIn, { loading, error }] = useMutation(LOG_IN, {
    fetchPolicy: 'network-only',

    // update: cache =>
    //   cache.writeQuery({ id: 'isLoggedIn', query: IS_LOGGED_IN, data: true }),

    onCompleted: async data => {
      localStorage.setItem('userId', data.logIn.userId);

      isLoggedInVar(true);

      apolloClient.resetStore;

      await router.push('/');
    },

    onError: error => {
      console.log('LogInPage LOG_IN error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const formik = useFormik({
    initialValues: { logInEmail: 'user@email.com', logInPassword: 'user123$' },

    validationSchema,

    // validateOnChange: false,
    // validateOnBlur: true,

    onSubmit: (values, formikHelpers) => handleSubmit(values, formikHelpers)
  });

  const handleSubmit = async (values, formikHelpers) => {
    // const email = e.currentTarget.elements.email.value;

    // const password = e.currentTarget.elements.password.value;

    try {
      await logIn({
        variables: { email: values.logInEmail, password: values.logInPassword }
      });

      // formikHelpers.resetForm();

      formikHelpers.setSubmitting(false);
    } catch (error) {
      console.log('LogInPage handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  return (
    <>
      <h2 data-testid='LogInTitle'>Log In</h2>

      <form onSubmit={formik.handleSubmit}>
        <FormInput
          label='Email'
          id='logInEmailId'
          type='email'
          {...formik.getFieldProps('logInEmail')}
        />

        {formik.touched.logInEmail && formik.errors.logInEmail ? (
          <DisplayError error={{ message: formik.errors.logInEmail }} />
        ) : null}

        <FormInput
          label='Password'
          id='logInPasswordId'
          type='password'
          {...formik.getFieldProps('logInPassword')}
        />

        {formik.touched.logInPassword && formik.errors.logInPassword ? (
          <DisplayError error={{ message: formik.errors.logInPassword }} />
        ) : null}

        {error && <DisplayError error={error} />}

        <FloatRight>
          <Button
            aria-label='submit log in'
            type='submit'
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
            Log In
          </Button>
        </FloatRight>
      </form>
    </>
  );
};

LogInPage.getLayout = page => (
  <Layout title='Log in' description='LogIn page' hasHeader>
    {page}
  </Layout>
);

export default LogInPage;

const FloatRight = styled.div`
  float: right;
`;
