import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  useMutation,
  useApolloClient,
  ApolloCache,
  FetchResult
} from '@apollo/client';
import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { email, password } from '../../utils/AuthInputValidation';
import graphQLErrors from '../../utils/graphQLErrors';
import { CREATE_USER, IS_LOGGED_IN } from '../../graphql/queries/user';
import { isLoggedInVar } from '../../graphql/cache';
import FormInput from '../REUSEABLE/FormInput';
import PassReqList from './PassReqList';
import Button from '../REUSEABLE/Button';
import DisplayStatus from '../REUSEABLE/DisplayStatus';

interface Props {
  close?: () => void;
}

type HandleSubmit = (
  values: { signUpEmail: string; signUpPassword: string },
  formikHelpers: FormikHelpers<{ signUpEmail: string; signUpPassword: string }>
) => void;

const validationSchema = object().shape({
  signUpEmail: email,
  signUpPassword: password
});

const SignUpForm: FC<Props> = props => {
  const { close } = props;

  const router = useRouter();

  const apolloClient = useApolloClient();

  const update = (cache: ApolloCache<any>, data: FetchResult<any>) => {
    const isLoggedIn = !!data?.createUser?.user?.id;

    cache.writeQuery({
      id: 'isLoggedIn',
      query: IS_LOGGED_IN,
      data: { isLoggedIn }
    });
  };

  const onCompleted = async data => {
    apolloClient.resetStore();

    localStorage.setItem('userId', data.createUser.user.id);

    isLoggedInVar(true);

    // if (close) close();
    // else
    await router.push('/');
  };

  const [createUser, { error }] = useMutation(CREATE_USER, {
    fetchPolicy: 'network-only',

    update: (cache, data) => update(cache, data),

    onCompleted: data => onCompleted(data)
  });

  const handleSubmit: HandleSubmit = async (values, formikHelpers) => {
    try {
      await createUser({
        variables: {
          email: values.signUpEmail,
          password: values.signUpPassword
        }
      });

      formikHelpers.resetForm();

      formikHelpers.setSubmitting(false);
    } catch (error) {
      // console.log('SignUp handleSubmit error: ', error);
    }
  };

  const formik = useFormik({
    initialValues: { signUpEmail: '', signUpPassword: '' },

    validationSchema,

    onSubmit: (values, formikHelpers) => handleSubmit(values, formikHelpers)
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        label='Email'
        id='signUpEmailId'
        type='email'
        {...formik.getFieldProps('signUpEmail')}
      />

      {formik.touched.signUpEmail && formik.errors.signUpEmail ? (
        <DisplayStatus status='error'>
          {formik.errors.signUpEmail}
        </DisplayStatus>
      ) : null}

      <FormInput
        label='Password'
        id='signUpPasswordId'
        type='password'
        {...formik.getFieldProps('signUpPassword')}
      />

      {formik.touched.signUpPassword && formik.errors.signUpPassword ? (
        <DisplayStatus status='error'>
          {formik.errors.signUpPassword}
        </DisplayStatus>
      ) : null}

      {error && (
        <DisplayStatus status='error'>{graphQLErrors(error)}</DisplayStatus>
      )}

      <PassReqList />

      <Buttonn
        aria-label='submit sign up'
        type='submit'
        disabled={
          !!(
            !formik.values.signUpEmail ||
            !formik.values.signUpPassword ||
            formik.errors.signUpEmail ||
            formik.errors.signUpPassword ||
            formik.isSubmitting
          )
        }
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
