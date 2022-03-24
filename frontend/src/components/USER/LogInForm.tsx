import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { email, password } from '../../utils/validateAuthInputs';
import { isLoggedInVar } from '../../graphql/cache';
import { LOG_IN } from '../../graphql/queries/user';
import { User } from '../../models';
import Button from '../REUSEABLE/Button';
import DisplayStatus from '../REUSEABLE/DisplayStatus';
import FormInput from '../REUSEABLE/FormInput';
import graphQLErrors from '../../utils/graphQLErrors';
import useUser from '../../hooks/useUser';

interface Props {
  close?: () => void;
}

interface Data {
  logIn: { user: User };
}

type HandleSubmit = (
  formikHelpers: FormikHelpers<{ logInEmail: string; logInPassword: string }>,
  values: { logInEmail: string; logInPassword: string }
) => void;

const validationSchema = object().shape({
  logInEmail: email,
  logInPassword: password
});

const LogInForm: FC<Props> = ({ close }) => {
  const router = useRouter();

  const { setUser } = useUser();

  const onCompleted = (data: Data) => {
    setUser(data.logIn.user);

    isLoggedInVar(true);

    // when logging in from /login page
    if (!close) router.push('/');
  };

  const [logIn, { error, loading }] = useMutation(LOG_IN, {
    fetchPolicy: 'network-only',

    onCompleted: data => onCompleted(data)
  });

  const handleSubmit: HandleSubmit = async (formikHelpers, values) => {
    await logIn({
      variables: { email: values.logInEmail, password: values.logInPassword }
    });

    formikHelpers.resetForm();

    formikHelpers.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: { logInEmail: 'user@email.com', logInPassword: 'user123$' },

    validationSchema,

    onSubmit: (values, formikHelpers) => handleSubmit(formikHelpers, values)
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        id='logInEmailId'
        label='Email'
        type='email'
        {...formik.getFieldProps('logInEmail')}
      />

      {formik.touched.logInEmail && formik.errors.logInEmail ? (
        <DisplayStatus status='error'>{formik.errors.logInEmail}</DisplayStatus>
      ) : null}

      <FormInput
        id='logInPasswordId'
        label='Password'
        type='password'
        {...formik.getFieldProps('logInPassword')}
      />

      {formik.touched.logInPassword && formik.errors.logInPassword ? (
        <DisplayStatus status='error'>
          {formik.errors.logInPassword}
        </DisplayStatus>
      ) : null}

      {error && (
        <DisplayStatus status='error'>{graphQLErrors(error)}</DisplayStatus>
      )}

      <Buttonn
        disabled={
          !!(
            !formik.values.logInEmail ||
            !formik.values.logInPassword ||
            formik.errors.logInEmail ||
            formik.errors.logInPassword ||
            formik.isSubmitting
          )
        }
        loading={loading}
        name='logIn'
        type='submit'
      >
        Log in
      </Buttonn>

      <LogInLinks>
        <Link href='/reqpassreset' passHref>
          <A>Reset Password</A>
        </Link>

        <Link href='/signup' passHref>
          <A>Create account</A>
        </Link>
      </LogInLinks>
    </Form>
  );
};

export default LogInForm;

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

export const LogInLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
