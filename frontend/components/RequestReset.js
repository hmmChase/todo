import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { REQUEST_RESET } from '../graphql/queries';

const RequestReset = () => {
  const [email, setEmail] = useState('');

  const [requestReset, { loading, error, called }] = useMutation(
    REQUEST_RESET,
    { onError(_error) {} }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        requestReset({ variables: { email } });
      }}
    >
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

        {error && <p>{error}</p>}

        {!error && !loading && called && (
          <p>Check your email for a reset link.</p>
        )}

        <button type='submit'>Submit</button>
      </fieldset>
    </form>
  );
};

export default RequestReset;
