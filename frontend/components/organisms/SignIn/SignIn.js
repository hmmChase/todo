import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Form as FormikForm, Formik } from 'formik';
import { object } from 'yup';
import { setAccessToken } from '../../../utils/accessToken';
import { username, password } from '../../../utils/validation';
import { SIGN_IN, IS_LOGGED_IN } from '../../../graphql/queries';
import FormInput from '../../atoms/FormInput/FormInput';
import FormInputPass from '../../atoms/FormInputPass/FormInputPass';
import Button from '../../atoms/Button/Button';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import * as sc from './SignIn.style';

const validationSchema = object().shape(username, password);

const SignIn = () => {
  const update = (cache, data) => {
    const isLoggedIn = !!data.data.signIn.accessToken;

    cache.writeQuery({
      id: 'isLoggedIn',
      query: IS_LOGGED_IN,
      data: { isLoggedIn },
    });
  };

  const onCompleted = (data) => {
    if (data && data.signIn && data.signIn.accessToken) {
      setAccessToken(data.signIn.accessToken);

      Router.push('/');
    }
  };

  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    // fetchPolicy: 'network-only',

    update(cache, data) {
      update(cache, data);
    },

    onCompleted(data) {
      onCompleted(data);
    },

    onError(_error) {},
  });

  const onSubmit = (values, formikHelpers) => {
    signIn({ variables: values });

    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ username: 'user1', password: 'User123#' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <FormikForm>
          <h2 data-testid='SignInTitle'>Sign In</h2>

          <FormInput label='Username' id='signInUsername' name='username' />

          <FormInputPass label='Password' id='signInPassword' name='password' />

          {error && <DisplayError error={error} />}

          <sc.FormItemBtn>
            <Button
              ariaLabel='sign in'
              type='primary'
              htmlType='submit'
              loading={loading}
              disabled={
                !!(
                  !formikProps.values.username ||
                  !formikProps.values.password ||
                  formikProps.errors.username ||
                  formikProps.errors.password ||
                  formikProps.isSubmitting
                )
              }
            >
              Sign In
            </Button>
          </sc.FormItemBtn>
        </FormikForm>
      )}
    </Formik>
  );
};

export default SignIn;
