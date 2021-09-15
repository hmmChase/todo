import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useApolloClient } from '@apollo/client';

import { LOG_IN } from '../graphql/queries/user';
import { isLoggedInVar } from '../graphql/cache';
import graphQLErrors from '../utils/graphQLErrors';
import Layout from '../components/LAYOUTS/Layout';
import Field from '../components/OTHER/Field';

const LogInPage = () => {
  const [errorMsg, setErrorMsg] = useState();

  const router = useRouter();

  const apolloClient = useApolloClient();

  const [logIn] = useMutation(LOG_IN, {
    // update: cache =>
    //   cache.writeQuery({ id: 'isLoggedIn', query: IS_LOGGED_IN, data: true }),

    onCompleted: async data => {
      if (data.logIn) {
        localStorage.setItem('userId', data.logIn.user.id);

        isLoggedInVar(true);
      }

      await router.push('/');
    },

    onError: error => {
      console.log('LogInPage LOG_IN error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const email = e.currentTarget.elements.email.value;

    const password = e.currentTarget.elements.password.value;

    try {
      await apolloClient.resetStore;

      await logIn({ variables: { email, password } });
    } catch (error) {
      console.log('LogInPage handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  return (
    <>
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}

        <Field
          label='Email'
          name='email'
          type='email'
          autoComplete='email'
          defaultValue='user@email.com'
          required
        />
        <Field
          label='Password'
          name='password'
          type='password'
          autoComplete='password'
          defaultValue='user123$'
          required
        />

        <button type='submit'>Log in</button>

        <span> or </span>

        <Link href='/signup'>
          <a>Sign up</a>
        </Link>
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
