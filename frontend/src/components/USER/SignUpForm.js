import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { email, password } from '../../utils/AuthInputValidation';
import graphQLErrors from '../../utils/graphQLErrors';
import { CREATE_USER, IS_LOGGED_IN } from '../../graphql/queries/user';
import { isLoggedInVar } from '../../graphql/cache';
import FormInput from '../REUSEABLE/FormInput';
import PassReqList from './PassReqList';
import Button from '../REUSEABLE/Button';
import DisplayError from '../REUSEABLE/DisplayError';

const validationSchema = object().shape({
  signUpEmail: email,
  signUpPassword: password
});

const SignUpForm = props => {
  const { close } = props;

  const [errorMsg, setErrorMsg] = useState();

  const router = useRouter();

  const apolloClient = useApolloClient();

  const update = (cache, data) => {
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

  const onError = error => {
    console.log('SignUp onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const [createUser] = useMutation(CREATE_USER, {
    fetchPolicy: 'network-only',

    update: (cache, data) => update(cache, data),

    onCompleted: data => onCompleted(data),

    onError: error => onError(error)
  });

  const handleSubmit = async (values, formikHelpers) => {
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
      console.log('SignUp handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
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
        <DisplayError error={{ message: formik.errors.signUpEmail }} />
      ) : null}

      <FormInput
        label='Password'
        id='signUpPasswordId'
        type='password'
        {...formik.getFieldProps('signUpPassword')}
      />

      {formik.touched.signUpPassword && formik.errors.signUpPassword ? (
        <DisplayError error={{ message: formik.errors.signUpPassword }} />
      ) : null}

      {errorMsg && <DisplayError error={{ message: errorMsg }} />}

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

      <Link href='/login'>
        <A>Log in</A>
      </Link>
    </Form>
  );
};

SignUpForm.propTypes = {
  close: PropTypes.func
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
