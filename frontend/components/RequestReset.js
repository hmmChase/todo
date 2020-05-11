import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { validateEmail } from '../utils/validation';
import { passResetRequestSent } from '../config';
import { REQUEST_RESET } from '../graphql/queries';

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(!email);

  const [requestReset, { loading, error, called }] = useMutation(
    REQUEST_RESET,

    { onError(_error) {} }
  );

  const onChange = (e) => {
    setEmail(e.target.value);

    setIsSubmitDisabled(!e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const hasEmailError = validateEmail(email);

    if (hasEmailError) setEmailError(hasEmailError);
    else if (emailError) setEmailError('');

    if (!hasEmailError) requestReset({ variables: { email } });
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <h2>Request Password Reset</h2>

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

        <button
          aria-label='request reset'
          type='submit'
          disabled={loading || isSubmitDisabled}
        >
          Request
        </button>

        {emailError && <p>{emailError}</p>}

        {!emailError &&
          error &&
          error.graphQLErrors.map((graphQLError, i) => (
            <p key={i}>{graphQLError.message}</p>
          ))}

        {!error && !loading && called && <p>{passResetRequestSent}</p>}
      </fieldset>
    </form>
  );
};

export default RequestReset;
