import PropTypes from 'prop-types';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { Form as FormikForm, Formik } from 'formik';
import { object } from 'yup';
import { setAccessToken } from '../../../utils/accessToken';
import {
  username,
  email,
  password,
  confirmPassword
} from '../../../utils/validation';
import { SIGN_UP } from '../../../graphql/queries';
import FormInput from '../../atoms/FormInput/FormInput';
import FormInputPass from '../../atoms/FormInputPass/FormInputPass';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import PassReqList from '../../molecules/PassReqList/PassReqList';
import Button from '../../atoms/Button/Button';
import * as sc from './SignUp.style';

const validationSchema = object().shape(
  username,
  email,
  password,
  confirmPassword
);

const SignUp = () => {
  const update = (cache, data) => {
    const isLoggedIn = !!data.data.signIn.accessToken;

    cache.writeQuery({
      id: 'isLoggedIn',
      query: IS_LOGGED_IN,
      data: { isLoggedIn }
    });
  };

  const onCompleted = data => {
    if (data && data.signUp && data.signUp.accessToken) {
      setAccessToken(data.signUp.accessToken);

      Router.push('/');
    }
  };

  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    // fetchPolicy: 'network-only',

    update(cache, data) {
      update(cache, data);
    },

    onCompleted(data) {
      onCompleted(data);
    },

    onError(_error) {}
  });

  const onSubmit = async (values, formikHelpers) => {
    signUp({ variables: values });

    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={onSubmit}
    >
      {formikProps => (
        <FormikForm>
          <h2>Create a new Account</h2>

          <FormInput label='Username' id='signUpUsername' name='username' />

          <FormInput label='Email' id='signUpEmail' name='email' />

          <FormInputPass label='Password' id='sigUpPassword' name='password' />

          <FormInputPass
            label='Confirm Password'
            id='sigUpConfirmPassword'
            name='confirmPassword'
          />

          {error && <DisplayError error={error} />}

          <PassReqList />

          <sc.FormItemBtn>
            <Button
              aria-label='sign up'
              type='primary'
              htmlType='submit'
              loading={loading}
              disabled={
                !!(
                  !formikProps.values.email ||
                  !formikProps.values.username ||
                  !formikProps.values.password ||
                  !formikProps.values.confirmPassword ||
                  formikProps.errors.email ||
                  formikProps.errors.password ||
                  formikProps.errors.confirmPassword ||
                  formikProps.isSubmitting
                )
              }
            >
              Sign Up
            </Button>
          </sc.FormItemBtn>
        </FormikForm>
      )}
    </Formik>
  );
};

SignUp.propTypes = {
  className: PropTypes.string
};

export default SignUp;
