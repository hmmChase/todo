import { useState } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { setAccessToken } from '../utils/accessToken';
import { validateUsername } from '../utils/validation';
import { SIGN_IN, IS_LOGGED_IN } from '../graphql/queries';

const SignIn = () => {
  const [username, setUsername] = useState('user1');
  const [password, setPassword] = useState('User123#');
  const [usernameError, setUsernameError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(
    !username && !password
  );

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

  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    // fetchPolicy: 'network-only',

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

      setIsSubmitDisabled(!e.target.value || !password);
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);

      setIsSubmitDisabled(!e.target.value || !username);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const hasUsernameError = validateUsername(username);

    if (hasUsernameError) setUsernameError(hasUsernameError);
    else if (usernameError) setUsernameError('');

    if (!hasUsernameError) signIn({ variables: { username, password } });
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

        <button
          aria-label='sign in'
          type='submit'
          disabled={loading || isSubmitDisabled}
        >
          Sign In
        </button>

        {usernameError && <p>{usernameError}</p>}

        {!usernameError &&
          error &&
          error.graphQLErrors.map((graphQLError, i) => (
            <p key={i}>{graphQLError.message}</p>
          ))}
      </fieldset>
    </form>
  );
};

export default SignIn;
