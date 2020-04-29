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

  const handleSubmit = (e) => {
    e.preventDefault();

    requestReset({ variables: { email } });
  };

  return (
    <form onSubmit={handleSubmit}>
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

        {!error && !loading && called && (
          <p>Check your email for a reset link.</p>
        )}

        <button type='submit'>Submit</button>
      </fieldset>
    </form>
  );
};

export default RequestReset;