import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import type { ApolloError } from '@apollo/client';

import { PASS_RESET } from '@/graphql/queries/user';
import { password } from '@/utils/validateAuthInputs';
import { UserCtx } from '@/context/User';
import Button from '@/components/COMMON/Button/Button';
import displayMsg from '@/constants/displayMsg';
import FormInput from '@/components/COMMON/FormInput/FormInput';
import Notice from '@/components/COMMON/Notice/Notice';
import parseGQLErrors from '@/utils/parseGQLErrors';
import PassReqList from '@/components/USER/PassReqList/PassReqList';
import type { User } from '@/models/index';
// import { isLoggedInVar } from '@/graphql/cache';

interface Props {
  passResetToken: string;
}

interface Data {
  passReset: { success: boolean; user: User };
}

type HandleSubmit = (
  formikHelpers: FormikHelpers<{ newPassword: string }>,
  values: { newPassword: string }
) => void;

const validationSchema = object().shape({ newPassword: password });

const PassReset = ({ passResetToken }: Props) => {
  const [apolloError, setApolloError] = useState<ApolloError>();

  const [success, setSuccess] = useState(false);

  const { setUser } = useContext(UserCtx);

  const onCompleted = (data: Data) => {
    setUser(data.passReset.user);

    // isLoggedInVar(true);

    setSuccess(data.passReset.success);
  };

  const [passReset, { loading }] = useMutation(PASS_RESET, {
    fetchPolicy: 'network-only',

    onCompleted: data => onCompleted(data),

    onError: error => setApolloError(error)
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

      {formik.touched.newPassword && formik.errors.newPassword && (
        <Notice type='error'>{formik.errors.newPassword}</Notice>
      )}

      {apolloError && (
        <Notice type='error'>{parseGQLErrors(apolloError)}</Notice>
      )}

      {success && (
        <Notice type='success'>{displayMsg.user.passReset.success}</Notice>
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
