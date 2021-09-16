import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useApolloClient } from '@apollo/client';

import { CREATE_USER } from '../graphql/queries/user';
import { isLoggedInVar } from '../graphql/cache';
import graphQLErrors from '../utils/graphQLErrors';
import Layout from '../components/LAYOUTS/Layout';
import Field from '../components/OTHER/Field';

const SignUpPage = () => {
  const [errorMsg, setErrorMsg] = useState();

  const router = useRouter();

  const client = useApolloClient();

  const [createUser] = useMutation(CREATE_USER, {
    // update: cache =>
    //   cache.writeQuery({ id: 'isLoggedIn', query: IS_LOGGED_IN, data: true }),

    onCompleted: async () => {
      localStorage.setItem('userId', data.createUser.user.id);

      isLoggedInVar(true);

      await router.push('/');
    },

    onError: error => {
      console.log('SignUpPage CREATE_USER error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const email = e.currentTarget.elements.email.value;

    const password = e.currentTarget.elements.password.value;

    try {
      await client.resetStore();

      await createUser({ variables: { email, password } });
    } catch (error) {
      console.log('SignUpPage handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}

        <Field
          label='Email'
          name='email'
          type='email'
          autoComplete='email'
          required
        />

        <Field
          label='Password'
          name='password'
          type='password'
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

SignUpPage.getLayout = page => (
  <Layout title='Sign up' description='SignUp page' hasHeader>
    {page}
  </Layout>
);

export default SignUpPage;
