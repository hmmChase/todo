import { useState } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { setAccessToken } from '../utils/accessToken';
import { passwordRequirements } from '../config';
import { SIGN_UP, IS_LOGGED_IN } from '../graphql/queries';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const update = (cache, data) => {
    const isLoggedIn = !!data.data.signUp.accessToken;

    cache.writeQuery({
      id: 'isLoggedIn',
      query: IS_LOGGED_IN,
      data: { isLoggedIn },
    });
  };

  const onCompleted = (data) => {
    if (data && data.signUp && data.signUp.accessToken) {
      setAccessToken(data.signUp.accessToken);

      Router.push('/');
    }
  };

  const [signUp, { error }] = useMutation(SIGN_UP, {
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

    signUp({ variables: { username, email, password, confirmPassword } });
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <h2>Sign Up</h2>

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

        <div>
          <label htmlFor='confirmPassword'>
            Confirm Password
            <input
              name='confirmPassword'
              placeholder='password'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>

        <h3>{passwordRequirements.title}</h3>

        <ul>
          {passwordRequirements.reqs.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>

        <button aria-label='sign up' type='submit'>
          Sign Up
        </button>

        {error &&
          error.graphQLErrors.map((graphQLError, i) => (
            <p key={i}>{graphQLError.message}</p>
          ))}
      </fieldset>
    </form>
  );
};

export default SignUp;
