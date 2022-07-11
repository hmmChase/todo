import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ApolloError, useMutation } from '@apollo/client';
import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { email, password } from '@/utils/validateAuthInputs';
import { SIGN_UP } from '@/graphql/queries/user';
import { User } from '@/models';
import { UserCtx } from '@/context/User';
import Button from '@/components/REUSEABLE/Button';
import Error from '@/components/REUSEABLE/Error';
import FormInput from '@/components/REUSEABLE/FormInput';
import PassReqList from '@/components/USER/PassReqList';
// import { isLoggedInVar } from '@/graphql/cache';

interface Props {
  close?: () => void;
}

interface Data {
  signUp: { user: User };
}

type HandleSubmit = (
  formikHelpers: FormikHelpers<{ signUpEmail: string; signUpPassword: string }>,
  values: { signUpEmail: string; signUpPassword: string }
) => void;

const validationSchema = object().shape({
  signUpEmail: email,
  signUpPassword: password
});

const SignUpForm: FC<Props> = ({ close }) => {
  const [apolloError, setApolloError] = useState<ApolloError>();

  const { setUser } = useContext(UserCtx);

  const router = useRouter();

  const onCompleted = (data: Data) => {
    setUser(data.signUp.user);

    // isLoggedInVar(true);

    // when logging in from /signup page
    if (!close) router.push('/');
  };

  const [signUp, { error, loading }] = useMutation(SIGN_UP, {
    fetchPolicy: 'network-only',

    onCompleted: data => onCompleted(data),

    onError: error => setApolloError(error)
  });

  const handleSubmit: HandleSubmit = async (formikHelpers, values) => {
    await signUp({
      variables: { email: values.signUpEmail, password: values.signUpPassword }
    });

    formikHelpers.resetForm();

    formikHelpers.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: { signUpEmail: '', signUpPassword: '' },

    validationSchema,

    onSubmit: (values, formikHelpers) => handleSubmit(formikHelpers, values)
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        id='signUpEmail'
        label='Email'
        type='email'
        {...formik.getFieldProps('signUpEmail')}
      />

      {formik.touched.signUpEmail && formik.errors.signUpEmail && (
        <Error error={formik.errors.signUpEmail} />
      )}

      <FormInput
        id='signUpPassword'
        label='Password'
        type='password'
        {...formik.getFieldProps('signUpPassword')}
      />

      {formik.touched.signUpPassword && formik.errors.signUpPassword && (
        <Error error={formik.errors.signUpPassword} />
      )}

      {apolloError && <Error error={apolloError} />}

      <PassReqList />

      <Buttonn
        disabled={
          !!(
            !formik.values.signUpEmail ||
            !formik.values.signUpPassword ||
            formik.errors.signUpEmail ||
            formik.errors.signUpPassword ||
            formik.isSubmitting
          )
        }
        loading={loading}
        name='signUp'
        type='submit'
      >
        Sign up
      </Buttonn>

      <Link href='/login' passHref>
        <A>Log in</A>
      </Link>
    </Form>
  );
};

export default SignUpForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > input {
    margin-bottom: 0.5rem;
  }
`;

const Buttonn = styled(Button)`
  align-self: flex-end;
  margin-bottom: 1rem;
`;

const A = styled.a`
  align-self: flex-start;
  cursor: pointer;
  font-size: ${props => props.theme.fontSize.small};
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
