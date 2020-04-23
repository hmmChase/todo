import { useState } from 'react';
import Router from 'next/router';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
// import { useApolloClient, useMutation } from '@apollo/client';
import { setAccessToken } from '../utils/accessToken';
import { SIGN_IN, IS_LOGGED_IN } from '../graphql/queries';

const SignIn = () => {
  const [email, setEmail] = useState('user@email.com');
  const [password, setPassword] = useState('User123#');

  const [signIn] = useMutation(SIGN_IN, {
    update(cache, data) {
      cache.writeData({
        id: 'isLoggedIn',
        data: { isLoggedIn: !!data.data.signIn.accessToken },
      });
    },

    onCompleted(data) {
      if (data && data.signIn && data.signIn.accessToken) {
        setAccessToken(data.signIn.accessToken);

        Router.push('/');
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        signIn({ variables: { email, password } });
      }}
    >
      <fieldset>
        <h2>Sign In</h2>

        <div>
          <label htmlFor='email'>
            Email
            <input
              name='email'
              placeholder='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='password'>
            Password
            <input
              name='password'
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button type='submit'>Log In</button>
      </fieldset>
    </form>
  );
};

export default SignIn;
