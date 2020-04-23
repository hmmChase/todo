import { useState } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { setAccessToken } from '../utils/accessToken';
import { SIGN_UP } from '../graphql/queries';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted(data) {
      if (data && data.signUp && data.signUp.accessToken) {
        setAccessToken(data.signUp.accessToken);

        Router.push('/');
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        signUp({ variables: { email, password, confirmPassword } });
      }}
    >
      <fieldset>
        <h2>Sign Up</h2>

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

        <h3>Password must contain:</h3>

        <ul>
          <li>at least 8 charactors</li>
          <li>an uppercase letter</li>
          <li>a lowercase letter</li>
          <li>a number</li>
        </ul>

        <button type='submit'>Sign Up</button>
      </fieldset>
    </form>
  );
};

export default SignUp;
