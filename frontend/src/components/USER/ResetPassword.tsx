import { FC, useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { FormikHelpers, useFormik } from 'formik';
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

type HandleSubmit = (
  values: { newPassword: any },
  formikHelpers: FormikHelpers<{ newPassword: string }>
) => void;

const validationSchema = object().shape({ newPassword: password });

const ResetPassword: FC<Props> = props => {
  const { resetPassToken } = props;

  const [isSuccessful, setIsSuccessful] = useState(false);

  const apolloClient = useApolloClient();

  const onCompleted = data => {
    localStorage.setItem('userId', data.changePassword.user.id);

    isLoggedInVar(true);

    apolloClient.resetStore;

    if (data && data.changePassword.user.id) setIsSuccessful(true);
  };

  const [changePassword, { loading, error, data }] = useMutation(
    CHANGE_PASSWORD,
    {
      fetchPolicy: 'network-only',

      onCompleted: data => onCompleted(data)
    }
  );

  const handleSubmit: HandleSubmit = async (values, formikHelpers) => {
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
        <DisplayStatus status='error'>
          {formik.errors.newPassword}
        </DisplayStatus>
      ) : null}

      {error && (
        <DisplayStatus status='error'>{graphQLErrors(error)}</DisplayStatus>
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
