import { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { isLoggedInVar } from '../../graphql/cache';
import { PASS_RESET } from '../../graphql/queries/user';
import { password } from '../../utils/validateAuthInputs';
import { User } from '../../models';
import Button from '../REUSEABLE/Button';
import displayMessages from '../../constants/displayMessages';
import DisplayStatus from '../REUSEABLE/DisplayStatus';
import FormInput from '../REUSEABLE/FormInput';
import graphQLErrors from '../../utils/graphQLErrors';
import PassReqList from './PassReqList';
import useUser from '../../hooks/useUser';

interface Props {
  passResetToken: string;
}

interface Data {
  passReset: { user: User };
}

type HandleSubmit = (
  formikHelpers: FormikHelpers<{ newPassword: string }>,
  values: { newPassword: string }
) => void;

const validationSchema = object().shape({ newPassword: password });

const PassReset: FC<Props> = ({ passResetToken }) => {
  const [success, setSuccess] = useState(false);

  const { setUser } = useUser();

  const onCompleted = (data: Data) => {
    setUser(data.passReset.user);

    isLoggedInVar(true);

    setSuccess(true);
  };

  const [passReset, { error, loading }] = useMutation(PASS_RESET, {
    fetchPolicy: 'network-only',

    onCompleted: data => onCompleted(data)
  });

  const handleSubmit: HandleSubmit = async (formikHelpers, values) => {
    await passReset({
      variables: { passResetToken, newPassword: values.newPassword }
    });

    formikHelpers.resetForm();

    formikHelpers.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: { newPassword: '' },

    validationSchema,

    onSubmit: (values, formikHelpers) => handleSubmit(formikHelpers, values)
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        id='newPasswordId'
        label='Password'
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

      {success && (
        <DisplayStatus status='success'>
          {displayMessages.user.passReset.success}
        </DisplayStatus>
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
        loading={loading}
        name='passReset'
        type='submit'
      >
        Reset Password
      </Button>
    </Form>
  );
};

export default PassReset;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > input {
    margin-bottom: 0.5rem;
  }
`;
