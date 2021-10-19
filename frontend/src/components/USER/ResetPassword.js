import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import { object } from 'yup';

import { password } from '../../utils/AuthInputValidation';
import { CHANGE_PASSWORD } from '../../graphql/queries/user';
import DisplaySuccess from '../REUSEABLE/DisplaySuccess';
import PassReqList from './PassReqList';
import { isLoggedInVar } from '../../graphql/cache';
import graphQLErrors from '../../utils/graphQLErrors';
import FormInput from '../../components/REUSEABLE/FormInput';
import Button from '../../components/REUSEABLE/Button';
import DisplayError from '../REUSEABLE/DisplayError';
import displayMessages from '../../configs/displayMessages';

const validationSchema = object().shape({ newPassword: password });

const ResetPassword = props => {
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
        <DisplayError error={{ message: formik.errors.newPassword }} />
      ) : null}

      {errorMsg && <DisplayError error={{ message: errorMsg }} />}

      <PassReqList />

      <Buttonn
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
      </Buttonn>

      {isSuccessful && (
        <DisplaySuccess message={displayMessages.user.success.ResetPassword} />
      )}
    </Form>
  );
};

ResetPassword.propTypes = {
  resetPassToken: PropTypes.string.isRequired
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

const Buttonn = styled(Button)`
  align-self: flex-end;
`;

const PassListContainer = styled.div`
  display: inline-block;
  margin-top: 20px;
`;

const PassListItem = styled.li`
  padding: 0;
`;

const FormItemBtn = styled.div`
  float: right;
`;

const SubmitBtn = styled(Button)`
  margin-top: 20px;
`;
