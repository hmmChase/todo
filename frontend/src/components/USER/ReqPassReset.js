// import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { object } from 'yup';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Link from 'next/link';

import FormInput from '../../components/REUSEABLE/FormInput';
import DisplayError from '../REUSEABLE/DisplayError';
import { email } from '../../utils/AuthInputValidation';
import Button from '../../components/REUSEABLE/Button';
import graphQLErrors from '../../utils/graphQLErrors';
import { REQ_PASS_RESET } from '../../graphql/queries/user';
import DisplaySuccess from '../REUSEABLE/DisplaySuccess';
import displayMessages from '../../configs/displayMessages';

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
    <Form onSubmit={formik.handleSubmit}>
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
        <DisplaySuccess message={displayMessages.user.success.ReqPassReset} />
      )}

      <Buttonn
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
      </Buttonn>

      <Link href='/login'>
        <A>Log in</A>
      </Link>
    </Form>
  );
};

// ReqPassReset.propTypes = {
//   // myProp: PropTypes.string.isRequired
// };

export default ReqPassReset;

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

const A = styled.a`
  cursor: pointer;
  align-self: flex-start;
  font-size: 0.8rem;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
