import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useApolloClient } from '@apollo/client';

import { SIGN_UP } from '../graphql/queries/user';
import Field from '../components/Field';
import graphQLErrors from '../utils/graphQLErrors';
import Layout from '../components/Layout';
import Header from '../components/Header';

const SignUpPage = () => {
  const [errorMsg, setErrorMsg] = useState();

  const router = useRouter();

  const client = useApolloClient();

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: async () => await router.push('/'),

    onError: async error => {
      console.log('SignUp SIGN_UP error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;

    const passwordElement = event.currentTarget.elements.password;

    try {
      await client.resetStore();

      await signUp({
        variables: {
          email: emailElement.value,
          password: passwordElement.value
        }
      });
    } catch (error) {
      console.log('SignUp handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}

        <Field
          name='email'
          type='email'
          autoComplete='email'
          label='Email'
          required
        />

        <Field
          name='password'
          type='password'
          label='Password'
          autoComplete='password'
          required
        />

        <button type='submit'>Sign up</button>

        <span> or </span>

        <Link href='/login'>
          <a>Log in</a>
        </Link>
      </form>
    </>
  );
};

SignUpPage.getLayout = function getLayout(page) {
  return (
    <Layout title='Sign up' description='SignUp page'>
      <Header />

      {page}
    </Layout>
  );
};

export default SignUpPage;
