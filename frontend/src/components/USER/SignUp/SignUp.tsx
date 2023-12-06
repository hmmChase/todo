import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { SIGN_UP } from '@/graphql/queries/user';

function SignUp() {
  const router = useRouter();

  const apolloClient = useApolloClient();

  const [signUp] = useMutation(SIGN_UP);

  async function handleSubmit(event: any) {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await apolloClient.resetStore();

      const { data } = await signUp({
        variables: {
          email: emailElement.value,
          password: passwordElement.value
        }
      });

      if (data.signUp.user) await router.push('/');
    } catch (error) {
      console.log('error:', error);
    }
  }

  return (
    <>
      <h1>Sign Up</h1>

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
          autoComplete='new-password'
          defaultValue='user123$'
          id={['password', 'input'].join('-')}
          name='password'
          required
          type='password'
        />
        <br />
        <button type='submit'>Sign up</button> or{' '}
        <Link href='/signin'>Sign in</Link>
      </form>
    </>
  );
}

export default SignUp;

// import { FormikHelpers, useFormik } from 'formik';
// import { object } from 'yup';
// import { useContext, useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import styled from 'styled-components';
// import type { ApolloError } from '@apollo/client';

// import { email, password } from '@/utils/validateAuthInputs';
// import { SIGN_UP } from '@/graphql/queries/user';
// import { User } from '@/models/index';
// import { UserCtx } from '@/context/User';
// import Button from '@/components/COMMON/Button/Button';
// import FormInput from '@/components/COMMON/FormInput/FormInput';
// import Notice from '@/components/COMMON/Notice/Notice';
// import parseGQLErrors from '@/utils/parseGQLErrors';
// import PassReqList from '@/components/USER/PassReqList/PassReqList';
// // import { isLoggedInVar } from '@/graphql/cache';

// interface Data {
//   signUp: { user: User };
// }

// type HandleSubmit = (
//   formikHelpers: FormikHelpers<{ signUpEmail: string; signUpPassword: string }>,
//   values: { signUpEmail: string; signUpPassword: string }
// ) => void;

// const validationSchema = object().shape({
//   signUpEmail: email,
//   signUpPassword: password
// });

// const SignUp = () => {
//   const [apolloError, setApolloError] = useState<ApolloError>();

//   const { setUser } = useContext(UserCtx);

//   const router = useRouter();

//   const onCompleted = (data: Data) => {
//     setUser(data.signUp.user);

//     // isLoggedInVar(true);

//     router.push('/');
//   };

//   const [signUp, { error, loading }] = useMutation(SIGN_UP, {
//     fetchPolicy: 'network-only',

//     onCompleted: data => onCompleted(data),

//     onError: error => setApolloError(error)
//   });

//   const handleSubmit: HandleSubmit = async (formikHelpers, values) => {
//     await signUp({
//       variables: { email: values.signUpEmail, password: values.signUpPassword }
//     });

//     formikHelpers.resetForm();

//     formikHelpers.setSubmitting(false);
//   };

//   const formik = useFormik({
//     initialValues: { signUpEmail: '', signUpPassword: '' },

//     validationSchema,

//     onSubmit: (values, formikHelpers) => handleSubmit(formikHelpers, values)
//   });

//   return (
//     <Form onSubmit={formik.handleSubmit}>
//       <FormInput
//         id='signUpEmail'
//         label='Email'
//         type='email'
//         {...formik.getFieldProps('signUpEmail')}
//       />

//       {formik.touched.signUpEmail && formik.errors.signUpEmail && (
//         <Notice type='error'>{formik.errors.signUpEmail}</Notice>
//       )}

//       <FormInput
//         id='signUpPassword'
//         label='Password'
//         type='password'
//         {...formik.getFieldProps('signUpPassword')}
//       />

//       {formik.touched.signUpPassword && formik.errors.signUpPassword && (
//         <Notice type='error'>{formik.errors.signUpPassword}</Notice>
//       )}

//       {apolloError && (
//         <Notice type='error'>{parseGQLErrors(apolloError)}</Notice>
//       )}

//       <PassReqList />

//       <Buttonn
//         disabled={
//           !!(
//             !formik.values.signUpEmail ||
//             !formik.values.signUpPassword ||
//             formik.errors.signUpEmail ||
//             formik.errors.signUpPassword ||
//             formik.isSubmitting
//           )
//         }
//         loading={loading}
//         name='signUp'
//         type='submit'
//       >
//         Sign up
//       </Buttonn>

//       <Linkk href='/login' passHref>
//         Log in
//       </Linkk>
//     </Form>
//   );
// };

// export default SignUp;

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
