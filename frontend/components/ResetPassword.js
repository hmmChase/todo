import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../graphql/queries';

const ResetPassword = (props) => {
  const { resetToken, resetTokenExpiry } = props;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // handleCompleted = () => Router.push({ pathname: '/' });

  const [resetPassword, { loading, error, data }] = useMutation(
    RESET_PASSWORD,
    {
      // onCompleted() {
      //   handleCompleted();
      // },
      onError(_error) {},
    }
  );

  const isTokenPresent = !!(resetToken && resetTokenExpiry);
  const isTokenExpired = Date.now() > resetTokenExpiry;
  // const isTokenValid = isTokenPresent && !isTokenExpired;

  const tokenMissingError =
    'Error: Please submit a new password reset request.';
  const tokenExpiredError =
    'Your reset request is expired. Please submit a new one.';

  if (!isTokenPresent)
    return (
      <fieldset>
        <h2>Reset Password</h2>

        <p>{tokenMissingError}</p>

        {/* <Link href={{ pathname: '/welcome' }}> */}
        <Link href={{ pathname: '/' }}>
          <button aria-label='back button'>Back</button>
        </Link>
      </fieldset>
    );
  else if (isTokenPresent && isTokenExpired)
    return (
      <fieldset>
        <h2>Reset Password</h2>

        <p>{tokenExpiredError}</p>

        {/* <Link href={{ pathname: '/welcome' }}> */}
        <Link href={{ pathname: '/' }}>
          <button aria-label='back button'>Back</button>
        </Link>
      </fieldset>
    );
  else if (!error && data && data.resetPassword)
    return (
      <fieldset>
        <h2>Reset Password</h2>

        <p>Your password has been successfully changed.</p>

        {/* <Link href={{ pathname: '/welcome' }}> */}
        <Link href={{ pathname: '/' }}>
          <button aria-label='back button'>Back</button>
        </Link>
      </fieldset>
    );
  else
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();

          resetPassword({
            variables: { resetToken, password, confirmPassword },
          });
        }}
      >
        <fieldset>
          <h2>Reset Password</h2>
          <>
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

            <h3>Password must contain:</h3>

            <ul>
              <li>at least 8 charactors</li>
              <li>an uppercase letter</li>
              <li>a lowercase letter</li>
              <li>a number</li>
            </ul>

            <button type='submit'>Reset Password</button>

            {error && <p>{error}</p>}
          </>
        </fieldset>
      </form>
    );
};

ResetPassword.defaultProps = { resetToken: '', resetTokenExpiry: '' };

ResetPassword.propTypes = {
  resetToken: PropTypes.string,
  resetTokenExpiry: PropTypes.string,
};

export default React.memo(ResetPassword);
