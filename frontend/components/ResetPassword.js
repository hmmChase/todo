import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { passwordRequirements } from '../config';
import { RESET_PASSWORD } from '../graphql/queries';
import BackBtn from './BackBtn';

const ResetPassword = (props) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(
    !password && !confirmPassword
  );

  const [resetPassword, { loading, error, data }] = useMutation(
    RESET_PASSWORD,

    { onError(_error) {} }
  );

  const onChange = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);

      setIsSubmitDisabled(!e.target.value || !confirmPassword);
    }

    if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);

      setIsSubmitDisabled(!e.target.value || !password);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    resetPassword({
      variables: { resetToken: props.resetToken, password, confirmPassword },
    });
  };

  if (!error && data && data.resetPassword)
    return (
      <>
        <p>{passResetSuccessful}</p>

        <BackBtn path='/' />
      </>
    );

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <div>
          <label htmlFor='password'>
            New Password
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
            Confirm New Password
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
          aria-label='reset password'
          type='submit'
          disabled={loading || isSubmitDisabled}
        >
          Reset
        </button>

        {error &&
          error.graphQLErrors.map((graphQLError, i) => (
            <p key={i}>{graphQLError.message}</p>
          ))}
      </fieldset>
    </form>
  );
};

ResetPassword.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default React.memo(ResetPassword);
