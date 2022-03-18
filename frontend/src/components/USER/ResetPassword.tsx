import { FC, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { CHANGE_PASSWORD } from '../../graphql/queries/user';
import { isLoggedInVar } from '../../graphql/cache';
import { password } from '../../utils/AuthInputValidation';
import Button from '../REUSEABLE/Button';
import displayMessages from '../../constants/displayMessages';
import DisplayStatus from '../REUSEABLE/DisplayStatus';
import FormInput from '../REUSEABLE/FormInput';
import graphQLErrors from '../../utils/graphQLErrors';
import PassReqList from './PassReqList';

interface Props {
  resetPassToken: string | string[];
}

type HandleSubmit = (
  formikHelpers: FormikHelpers<{ newPassword: string }>,
  values: { newPassword: any }
) => void;

const validationSchema = object().shape({ newPassword: password });

const ResetPassword: FC<Props> = ({ resetPassToken }) => {
  const [isSuccessful, setIsSuccessful] = useState(false);

  const apolloClient = useApolloClient();

  const onCompleted = (data: any) => {
    // localStorage.setItem('userId', data.changePassword.user.id);

    isLoggedInVar(true);

    apolloClient.resetStore;

    if (data && data.changePassword.user.id) setIsSuccessful(true);
  };

  const [changePassword, { error }] = useMutation(CHANGE_PASSWORD, {
    fetchPolicy: 'network-only',

    onCompleted: data => onCompleted(data)
  });

  const handleSubmit: HandleSubmit = async (formikHelpers, values) => {
    try {
      await changePassword({
        variables: { resetPassToken, newPassword: values.newPassword }
      });

      formikHelpers.resetForm();

      formikHelpers.setSubmitting(false);
    } catch (error) {
      // console.log('ResetPassword handleSubmit error: ', error);
    }
  };

  const formik = useFormik({
    initialValues: { newPassword: '' },

    validationSchema,

    // validateOnChange: false,
    // validateOnBlur: true,

    onSubmit: (values, formikHelpers) => handleSubmit(formikHelpers, values)
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
        <DisplayStatus status='error'>
          {formik.errors.newPassword}
        </DisplayStatus>
      ) : null}

      {error && (
        <DisplayStatus status='error'>{graphQLErrors(error)}</DisplayStatus>
      )}

      <PassReqList />

      <Button
        disabled={
          !!(
            !formik.values.newPassword ||
            formik.errors.newPassword ||
            formik.isSubmitting
          )
        }
        name='resetPassword'
        type='submit'
      >
        Reset Password
      </Button>

      {isSuccessful && (
        <DisplayStatus status='success'>
          {displayMessages.success.user.ResetPassword}
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
