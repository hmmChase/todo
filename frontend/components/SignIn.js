import { useState } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { setAccessToken } from '../utils/accessToken';
import { SIGN_IN, IS_LOGGED_IN } from '../graphql/queries';

const SignIn = () => {
  const [username, setUsername] = useState('user1');
  const [password, setPassword] = useState('User123#');

  const update = (cache, data) => {
    const isLoggedIn = !!data.data.signIn.accessToken;

    cache.writeQuery({
      id: 'isLoggedIn',
      query: IS_LOGGED_IN,
      data: { isLoggedIn },
    });
  };

  const onCompleted = (data) => {
    if (data && data.signIn && data.signIn.accessToken) {
      setAccessToken(data.signIn.accessToken);

      Router.push('/');
    }
  };

  const [signIn, { error }] = useMutation(SIGN_IN, {
    update(cache, data) {
      update(cache, data);
    },

    onCompleted(data) {
      onCompleted(data);
    },

    onError(_error) {},
  });

  const onSubmit = (e) => {
    e.preventDefault();

    signIn({ variables: { username, password } });
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <h2>Sign In</h2>

        <div>
          <label htmlFor='username'>
            Username
            <input
              name='username'
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

        <button aria-label='sign in' type='submit'>
          Sign In
        </button>

        {error &&
          error.graphQLErrors.map((graphQLError, i) => (
            <p key={i}>{graphQLError.message}</p>
          ))}
      </fieldset>
    </form>
  );
};

export default SignIn;
