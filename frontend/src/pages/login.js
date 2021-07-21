import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useApolloClient } from '@apollo/client';

import { LOG_IN } from '../graphql/queries/user';
import Field from '../components/Field';
import graphQLErrors from '../utils/graphQLErrors';

const LogIn = () => {
  const [errorMsg, setErrorMsg] = useState();

  const router = useRouter();

  const client = useApolloClient();

  const [logIn] = useMutation(LOG_IN, {
    onCompleted: async () => {
      console.log('onCompleted:');

      await router.push('/');
    },

    onError: async error => {
      console.log('LOG_IN error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;

    const passwordElement = event.currentTarget.elements.password;

    try {
      await client.resetStore();

      await logIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value
        }
      });
    } catch (error) {
      console.log('error logIn: ', error);

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

export default LogIn;
