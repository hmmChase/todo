import { FC, useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { FormikHelpers, useFormik } from 'formik';
import { object } from 'yup';
import styled from 'styled-components';

import { PASS_RESET } from '@/graphql/queries/user';
import { password } from '@/utils/validateAuthInputs';
import { User } from '@/models/index';
import { UserCtx } from '@/context/User';
import Button from '@/components/COMMON/Button/Button';
import displayMessages from '@/constants/displayMessages';
import Error from '@/components/COMMON/Error/Error';
import FormInput from '@/components/COMMON/FormInput/FormInput';
import PassReqList from '@/components/USER/PassReqList/PassReqList';
import Status from '@/components/COMMON/Status/Status';
// import { isLoggedInVar } from '@/graphql/cache';

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
  const [apolloError, setApolloError] = useState<ApolloError>();

  const [success, setSuccess] = useState(false);

  const { setUser } = useContext(UserCtx);

  const onCompleted = (data: Data) => {
    setUser(data.passReset.user);

    // isLoggedInVar(true);

    setSuccess(true);
  };

  const [passReset, { error, loading }] = useMutation(PASS_RESET, {
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
        <Error error={formik.errors.newPassword} />
      )}

      {apolloError && <Error error={apolloError} />}

      {success && (
        <Status status='success'>
          {displayMessages.user.passReset.success}
        </Status>
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
