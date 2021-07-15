import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation } from '@apollo/client';

import { SIGN_UP } from '../graphql/queries/user';
import Field from '../components/temp/Field';
import graphQLErrors from '../utils/graphQLErrors';

function SignUp() {
  const [signUp] = useMutation(SIGN_UP);

  const [errorMsg, setErrorMsg] = useState();

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;

    const passwordElement = event.currentTarget.elements.password;

    try {
      await signUp({
        variables: {
          email: emailElement.value,
          password: passwordElement.value
        }
      });

      router.push('/');
    } catch (error) {
      setErrorMsg(graphQLErrors(error));
    }
  }

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}

        <Field
          name='email'
          type='email'
          autoComplete='email'
          required
          label='Email'
        />

        <Field
          name='password'
          type='password'
          autoComplete='password'
          required
          label='Password'
        />

        <button type='submit'>Sign up</button>

        <span> or </span>

        <Link href='/login'>
          <a>Log in</a>
        </Link>
      </form>
    </>
  );
}

export default SignUp;
