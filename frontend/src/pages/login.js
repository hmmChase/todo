import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useApolloClient } from '@apollo/client';

import { IS_LOGGED_IN, LOG_IN } from '../graphql/queries/user';
import { isLoggedInVar } from '../graphql/cache';
import Field from '../components/Field';
import graphQLErrors from '../utils/graphQLErrors';
import Layout from '../components/Layout';

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
      console.log('LogIn LOG_IN error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;

    const passwordElement = event.currentTarget.elements.password;

    try {
      await apolloClient.resetStore;

      await logIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value
        }
      });
    } catch (error) {
      console.log('LogIn handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  return (
    <>
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}

        <Field
          name='email'
          type='email'
          label='Email'
          autoComplete='email'
          defaultValue='user@email.com'
          required
        />
        <Field
          name='password'
          type='password'
          label='Password'
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

LogInPage.getLayout = function getLayout(page) {
  return (
    <Layout title='Log in' description='LogIn page' header>
      {page}
    </Layout>
  );
};

export default LogInPage;
