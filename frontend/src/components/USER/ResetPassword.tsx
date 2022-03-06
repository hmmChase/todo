import { FC, useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import displayMessages from '../../constants/displayMessages';
import { password } from '../../utils/AuthInputValidation';
import graphQLErrors from '../../utils/graphQLErrors';
import { CHANGE_PASSWORD } from '../../graphql/queries/user';
import { isLoggedInVar } from '../../graphql/cache';
import FormInput from '../REUSEABLE/FormInput';
import PassReqList from './PassReqList';
import Button from '../REUSEABLE/Button';
import DisplayStatus from '../REUSEABLE/DisplayStatus';

interface Props {
  resetPassToken: string;
}

const validationSchema = object().shape({ newPassword: password });

const ResetPassword: FC<Props> = props => {
  const { resetPassToken } = props;

  const [errorMsg, setErrorMsg] = useState();

  const [isSuccessful, setIsSuccessful] = useState(false);

  const apolloClient = useApolloClient();

  const onCompleted = data => {
    localStorage.setItem('userId', data.changePassword.user.id);

    isLoggedInVar(true);

    apolloClient.resetStore;

    if (data && data.changePassword.user.id) setIsSuccessful(true);
  };

  const onError = error => {
    console.log('ResetPassword onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const [changePassword, { loading, error, data }] = useMutation(
    CHANGE_PASSWORD,
    {
      fetchPolicy: 'network-only',

      onCompleted: data => onCompleted(data),

      onError: error => onError(error)
    }
  );

  const handleSubmit = async (values, formikHelpers) => {
    try {
      await changePassword({
        variables: { resetPassToken, newPassword: values.newPassword }
      });

      formikHelpers.resetForm();

      formikHelpers.setSubmitting(false);
    } catch (error) {
      console.log('ResetPassword handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  const formik = useFormik({
    initialValues: { newPassword: '' },

    validationSchema,

    // validateOnChange: false,
    // validateOnBlur: true,

    onSubmit: (values, formikHelpers) => handleSubmit(values, formikHelpers)
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        label='Password'
        id='newPasswordId'
        type='password'
        {...formik.getFieldProps('newPassword')}
      />

      {formik.touched.newPassword && formik.errors.newPassword ? (
        <DisplayStatus
          status='error'
          error={{ message: formik.errors.newPassword }}
        />
      ) : null}

      {errorMsg && (
        <DisplayStatus status='error' error={{ message: errorMsg }} />
      )}

      <PassReqList />

      <Button
        aria-label='submit reset password'
        type='submit'
        disabled={
          !!(
            !formik.values.newPassword ||
            formik.errors.newPassword ||
            formik.isSubmitting
          )
        }
      >
        Reset Password
      </Button>

      {isSuccessful && (
        <DisplayStatus type='success'>
          {displayMessages.user.success.ResetPassword}
        </DisplayStatus>
      )}
    </Form>
  );
};

export default ResetPassword;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > input {
    margin-bottom: 0.5rem;
  }
`;
