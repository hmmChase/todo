import { email, password } from '@/utils/validateAuthInputs';
import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import { SIGN_UP } from '@/graphql/queries/user';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { User } from '@/models/index';
import { UserCtx } from '@/context/User';
import { useRouter } from 'next/router';
import Button from '@/components/COMMON/Button/Button';
import FormInput from '@/components/COMMON/FormInput/FormInput';
import Link from 'next/link';
import Notice from '@/components/COMMON/Notice/Notice';
import parseGQLerrors from '@/utils/parseGQLerrors';
import PassReqList from '@/components/USER/PassReqList/PassReqList';
import styled from 'styled-components';
import type { ApolloError } from '@apollo/client';
import type { FC } from 'react';
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
        <Notice type='error'>{formik.errors.signUpEmail}</Notice>
      )}

      <FormInput
        id='signUpPassword'
        label='Password'
        type='password'
        {...formik.getFieldProps('signUpPassword')}
      />

      {formik.touched.signUpPassword && formik.errors.signUpPassword && (
        <Notice type='error'>{formik.errors.signUpPassword}</Notice>
      )}

      {apolloError && (
        <Notice type='error'>{parseGQLerrors(apolloError)}</Notice>
      )}

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

      <Linkk href='/login' passHref>
        Log in
      </Linkk>
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

const Linkk = styled(Link)`
  /* align-self: flex-start; */
  /* cursor: pointer; */
  font-size: ${props => props.theme.fontSize.small};
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
