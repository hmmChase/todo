import { useState } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { setAccessToken } from '../utils/accessToken';
import { validateUsername, validateEmail } from '../utils/validation';
import { passwordRequirements } from '../config';
import { SIGN_UP, IS_LOGGED_IN } from '../graphql/queries';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(
    !username && !email && !password && !confirmPassword
  );

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

  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    update(cache, data) {
      update(cache, data);
    },

    onCompleted(data) {
      onCompleted(data);
    },

    onError(_error) {},
  });

  const onChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);

      setIsSubmitDisabled(
        !e.target.value || !email || !password || !confirmPassword
      );
    }

    if (e.target.name === 'email') {
      setEmail(e.target.value);

      setIsSubmitDisabled(
        !e.target.value || !username || !password || !confirmPassword
      );
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);

      setIsSubmitDisabled(
        !e.target.value || !username || !email || !confirmPassword
      );
    }

    if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);

      setIsSubmitDisabled(!e.target.value || !username || !email || !password);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const hasUsernameError = validateUsername(username);
    const hasEmailError = validateEmail(email);

    if (hasUsernameError) setUsernameError(hasUsernameError);
    else if (usernameError) setUsernameError('');

    if (hasEmailError) setEmailError(hasEmailError);
    else if (emailError) setEmailError('');

    if (!hasUsernameError && !hasEmailError)
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
              onChange={onChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor='email'>
            Email
            <input
              name='email'
              placeholder='email'
              type='text'
              value={email}
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
            />
          </label>
        </div>

        <h3>{passwordRequirements.title}</h3>

        <ul>
          {passwordRequirements.reqs.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>

        <button
          aria-label='sign up'
          type='submit'
          disabled={loading || isSubmitDisabled}
        >
          Sign Up
        </button>

        {usernameError && <p>{usernameError}</p>}

        {emailError && <p>{emailError}</p>}

        {!usernameError &&
          !emailError &&
          error &&
          error.graphQLErrors.map((graphQLError, i) => (
            <p key={i}>{graphQLError.message}</p>
          ))}
      </fieldset>
    </form>
  );
};

export default SignUp;
