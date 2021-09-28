// import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { object } from 'yup';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

import FormInput from '../../components/REUSEABLE/FormInput';
import DisplayError from '../REUSEABLE/DisplayError';
import { email } from '../../utils/AuthInputValidation';
import Button from '../../components/REUSEABLE/Button';
import graphQLErrors from '../../utils/graphQLErrors';
import { REQ_PASS_RESET } from '../../graphql/queries/user';
import DisplaySuccess from '../REUSEABLE/DisplaySuccess';

const validationSchema = object().shape({ reqPassResetEmail: email });

const ReqPassReset = () => {
  const [errorMsg, setErrorMsg] = useState();

  const onError = error => {
    console.log('ReqPassReset onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const [reqPassReset, { loading, error, data, called }] = useMutation(
    REQ_PASS_RESET,
    {
      fetchPolicy: 'network-only',

      onError: error => onError(error)
    }
  );

  const handleSubmit = async (values, formikHelpers) => {
    try {
      await reqPassReset({ variables: { email: values.reqPassResetEmail } });

      formikHelpers.resetForm();

      formikHelpers.setSubmitting(false);
    } catch (error) {
      console.log('ReqPassReset handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  const formik = useFormik({
    initialValues: { reqPassResetEmail: 'user@email.com' },

    validationSchema,

    onSubmit: (values, formikHelpers) => handleSubmit(values, formikHelpers)
  });

  return (
    <>
      <h2>Request Password Reset</h2>

      <form onSubmit={formik.handleSubmit}>
        <FormInput
          label='Email'
          id='reqPassResetEmailId'
          type='email'
          {...formik.getFieldProps('reqPassResetEmail')}
        />

        {formik.touched.reqPassResetEmail && formik.errors.reqPassResetEmail ? (
          <DisplayError error={{ message: formik.errors.reqPassResetEmail }} />
        ) : null}

        {errorMsg && <DisplayError error={{ message: errorMsg }} />}

        {!loading && !error && called && data && data.requestReset && (
          <DisplaySuccess message='Check your email for a reset link.' />
        )}

        <FormItemBtn>
          <SubmitBtn
            aria-label='submit request password reset'
            type='submit'
            disabled={
              !!(
                !formik.values.reqPassResetEmail ||
                formik.errors.reqPassResetEmail ||
                formik.isSubmitting
              )
            }
          >
            Submit
          </SubmitBtn>
        </FormItemBtn>
      </form>
    </>
  );
};

// ReqPassReset.propTypes = {
//   // myProp: PropTypes.string.isRequired
// };

export default ReqPassReset;

const FormItemBtn = styled.div`
  text-align: right;
`;

const SubmitBtn = styled(Button)`
  margin-top: 20px;
`;
