import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { SIGN_IN } from '@/graphql/queries/user';
import { useUser } from '@/context/User';
// import { isLoggedInVar } from '@/graphql/cache';

function SignIn() {
  const router = useRouter();

  const apolloClient = useApolloClient();

  const { setUser } = useUser();

  const [signIn] = useMutation(SIGN_IN);

  async function handleSubmit(event: any) {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await apolloClient.resetStore();

      const { data } = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value
        }
      });

      if (data.signIn.user) {
        setUser(data.signIn);

        // isSigngedInVar(!!data.signIn);

        await router.push('/');
      }
    } catch (error) {
      console.log('SignIn error:', error);
    }
  }

  return (
    <>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label
          id={['email', 'label'].join('-')}
          htmlFor={['email', 'input'].join('-')}
        >
          {'Email'} {<span title='Required'>*</span>}
        </label>
        <br />
        <input
          autoComplete='email'
          defaultValue='user@email.com'
          id={['email', 'input'].join('-')}
          name='email'
          required
          type='email'
        />
        <br />
        <label
          id={['password', 'label'].join('-')}
          htmlFor={['password', 'input'].join('-')}
        >
          {'Password'} {<span title='Required'>*</span>}
        </label>
        <br />
        <input
          autoComplete='current-password'
          defaultValue='user123$'
          id={['password', 'input'].join('-')}
          name='password'
          required
          type='password'
        />
        <br />
        <button type='submit'>Sign in</button> or{' '}
        <Link href='/signup'>Sign up</Link>
      </form>
    </>
  );
}

export default SignIn;

// import { FormikHelpers, useFormik } from 'formik';
// import { object } from 'yup';
// import { useApolloClient, useMutation } from '@apollo/client';
// import { useContext, useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import styled from 'styled-components';
// import type { ApolloError } from '@apollo/client';

// import { email, password } from '@/utils/validateAuthInputs';
// import { isLoggedInVar } from '@/graphql/cache';
// import { SIGN_IN } from '@/graphql/queries/user';
// import { UserCtx } from '@/context/User';
// import Button from '@/components/COMMON/Button/Button';
// import FormInput from '@/components/COMMON/FormInput/FormInput';
// import Notice from '@/components/COMMON/Notice/Notice';
// import parseGQLErrors from '@/utils/parseGQLErrors';
// import type { User } from '@/models/index';

// interface Data {
//   logIn: User;
// }

// type HandleSubmit = (
//   formikHelpers: FormikHelpers<{ logInEmail: string; logInPassword: string }>,
//   values: { logInEmail: string; logInPassword: string }
// ) => void;

// const validationSchema = object().shape({
//   logInEmail: email,
//   logInPassword: password
// });

// const SignIn = () => {
//   const [apolloError, setApolloError] = useState<ApolloError>();

//   const { setUser } = useContext(UserCtx);

//   const router = useRouter();

//   const apolloClient = useApolloClient();

//   const onCompleted = async (data: Data) => {
//     if (data.logIn) {
//       setUser(data.logIn);

//       isLoggedInVar(!!data.logIn);

//       // localStorage.setItem('userId', data.logIn.user.id);

//       await router.push('/');
//     }
//   };

//   const [logIn, { loading }] = useMutation(SIGN_IN, {
//     fetchPolicy: 'network-only',

//     onCompleted: data => onCompleted(data),

//     onError: error => setApolloError(error)
//   });

//   const handleSubmit: HandleSubmit = async (formikHelpers, values) => {
//     await apolloClient.resetStore();

//     await logIn({
//       variables: { email: values.logInEmail, password: values.logInPassword }
//     });

//     formikHelpers.resetForm();

//     formikHelpers.setSubmitting(false);
//   };

//   const formik = useFormik({
//     initialValues: { logInEmail: 'user@email.com', logInPassword: 'user123$' },

//     validationSchema,

//     onSubmit: (values, formikHelpers) => handleSubmit(formikHelpers, values)
//   });

//   return (
//     <Form onSubmit={formik.handleSubmit}>
//       <FormInput
//         id='logInEmailId'
//         label='Email'
//         type='email'
//         {...formik.getFieldProps('logInEmail')}
//       />

//       {formik.touched.logInEmail && formik.errors.logInEmail && (
//         <Notice type='error'>{formik.errors.logInEmail}</Notice>
//       )}

//       <FormInput
//         id='logInPasswordId'
//         label='Password'
//         type='password'
//         {...formik.getFieldProps('logInPassword')}
//       />

//       {formik.touched.logInPassword && formik.errors.logInPassword && (
//         <Notice type='error'>{formik.errors.logInPassword}</Notice>
//       )}

//       {apolloError && (
//         <Notice type='error'>{parseGQLErrors(apolloError)}</Notice>
//       )}

//       <Buttonn
//         disabled={
//           !!(
//             !formik.values.logInEmail ||
//             !formik.values.logInPassword ||
//             formik.errors.logInEmail ||
//             formik.errors.logInPassword ||
//             formik.isSubmitting
//           )
//         }
//         loading={loading}
//         name='logIn'
//         type='submit'
//       >
//         Log in
//       </Buttonn>

//       <LogInLinks>
//         <Linkk href='/passresetreq' passHref>
//           Reset Password
//         </Linkk>

//         <Linkk href='/signup' passHref>
//           Create account
//         </Linkk>
//       </LogInLinks>
//     </Form>
//   );
// };

// export default SignIn;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;

//   > input {
//     margin-bottom: 0.5rem;
//   }
// `;

// const Buttonn = styled(Button)`
//   align-self: flex-end;
//   margin: 0.5rem 0;
// `;

// export const LogInLinks = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const Linkk = styled(Link)`
//   /* align-self: flex-start; */
//   /* cursor: pointer; */
//   font-size: ${props => props.theme.fontSize.small};
//   font-weight: bold;
//   text-decoration: none;

//   &:hover {
//     text-decoration: underline;
//   }
// `;
