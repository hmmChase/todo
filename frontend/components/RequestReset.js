import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { passResetRequestSent } from '../config';
import { REQUEST_RESET } from '../graphql/queries';

const RequestReset = () => {
  const [email, setEmail] = useState('');

  const [requestReset, { loading, error, called }] = useMutation(
    REQUEST_RESET,

    { onError(_error) {} }
  );

  const onSubmit = (e) => {
    e.preventDefault();

    requestReset({ variables: { email } });
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
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        {error &&
          error.graphQLErrors.map((graphQLError, i) => (
            <p key={i}>{graphQLError.message}</p>
          ))}

        {!error && !loading && called && <p>{passResetRequestSent}</p>}

        <button aria-label='request reset' type='submit'>
          Submit
        </button>
      </fieldset>
    </form>
  );
};

export default RequestReset;
