import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOG_IN } from '../graphql/queries';

const getErrorMessage = error => {
  if (error.graphQLErrors)
    for (const graphQLError of error.graphQLErrors)
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 'BAD_USER_INPUT'
      )
        graphQLError.message;

  return error.message;
};

const Field = ({ name, label, type, autoComplete, required, defaultValue }) => (
  <div>
    <label id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')}>
      {label} {required ? <span title='Required'>*</span> : undefined}
    </label>

    <br />

    <input
      autoComplete={autoComplete}
      id={[name, 'input'].join('-')}
      name={name}
      required={required}
      type={type}
      defaultValue={defaultValue}
    />
  </div>
);

const LogIn = () => {
  const router = useRouter();

  const client = useApolloClient();

  const [logIn, { loading, error, data }] = useMutation(LOG_IN);

  console.log('logIn data: ', data);

  const [errorMsg, setErrorMsg] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await client.resetStore();

      const { data } = await logIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value
        }
      });

      if (data.logIn.user) await router.push('/');
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <>
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <Field
          name='email'
          type='email'
          autoComplete='email'
          required
          label='Email'
          defaultValue='user@email.com'
        />
        <Field
          name='password'
          type='password'
          autoComplete='password'
          required
          label='Password'
          defaultValue='user123$'
        />
        <button type='submit'>Log in</button>

        {/* <span>or </span> */}

        {/* <Link href='/signup'>
          <a>Sign up</a>
        </Link> */}
      </form>
    </>
  );
};

export default LogIn;
