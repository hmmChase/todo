import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import {
  passwordRequirements,
  passResetTokenMissingError,
  passResetTokenExpiredError,
  passResetSuccessful,
} from '../config';
import { RESET_PASSWORD } from '../graphql/queries';

const ResetPassword = (props) => {
  const { resetToken, resetTokenExpiry } = props;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [resetPassword, { error, data }] = useMutation(RESET_PASSWORD, {
    onError(_error) {},
  });

  const onSubmit = (e) => {
    e.preventDefault();

    resetPassword({ variables: { resetToken, password, confirmPassword } });
  };

  const isTokenPresent = !!(resetToken && resetTokenExpiry);
  const isTokenExpired = Date.now() > resetTokenExpiry;
  // const isTokenValid = isTokenPresent && !isTokenExpired;

  if (!isTokenPresent)
    return (
      <fieldset>
        <h2>Reset Password</h2>

        <p>{passResetTokenMissingError}</p>

        <Link href={{ pathname: '/welcome' }}>
          <button aria-label='back button'>Back</button>
        </Link>
      </fieldset>
    );
  else if (isTokenPresent && isTokenExpired)
    return (
      <fieldset>
        <h2>Reset Password</h2>

        <p>{passResetTokenExpiredError}</p>

        <Link href={{ pathname: '/welcome' }}>
          <button aria-label='back button'>Back</button>
        </Link>
      </fieldset>
    );
  else if (!error && data && data.resetPassword)
    return (
      <fieldset>
        <h2>Reset Password</h2>

        <p>{passResetSuccessful}</p>

        <Link href={{ pathname: '/' }}>
          <button aria-label='home button'>Home</button>
        </Link>
      </fieldset>
    );
  else
    return (
      <form onSubmit={onSubmit}>
        <fieldset>
          <h2>Reset Password</h2>
          <div>
            <label htmlFor='password'>
              New Password
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
              Confirm New Password
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

          <button aria-label='reset password' type='submit'>
            Reset Password
          </button>

          {error &&
            error.graphQLErrors.map((graphQLError, i) => (
              <p key={i}>{graphQLError.message}</p>
            ))}
        </fieldset>
      </form>
    );
};

ResetPassword.defaultProps = { resetToken: '', resetTokenExpiry: '' };

ResetPassword.propTypes = {
  resetToken: PropTypes.string.isRequired,
  resetTokenExpiry: PropTypes.string.isRequired,
};

export default React.memo(ResetPassword);
