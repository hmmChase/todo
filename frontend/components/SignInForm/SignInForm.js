import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import DisplayError from '../DisplayError/DisplayError';
import { SIGN_IN } from '../../graphql/queries';
import { setAccessToken } from '../../utils/authenticate';
import * as sc from './SignInForm.style';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .max(255, 'Must be 255 characters or less')
    .required('Required'),

  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .max(255, 'Must be 255 characters or less')
    .required('Required')
});

const SignInForm = () => {
  const handleCompleted = data => {
    if (data && data.signIn && data.signIn.accessToken) {
      setAccessToken(data.signIn.accessToken);

      Router.push('/');
    }
  };

  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted(data) {
      handleCompleted(data);
    },
    onError(_err) {}
  });

  const handleSubmitForm = (values, formikHelpers) => {
    signIn({ variables: values });

    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: 'user@email.com', password: 'User123#' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={handleSubmitForm}
    >
      {formikProps => (
        <sc.SignInForm>
          <h2>Sign In</h2>

          <Field name='email'>
            {fieldProps => (
              <sc.FormItem
                label='Email'
                htmlFor='signInEmail'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <sc.InputEmail
                  id='signInEmail'
                  type='email'
                  onPressEnter={fieldProps.form.handleSubmit}
                  prefix={<sc.InputIcon type='user' />}
                  {...fieldProps.field}
                />
              </sc.FormItem>
            )}
          </Field>

          <Field name='password'>
            {fieldProps => (
              <sc.FormItem
                label='Password'
                htmlFor='signInPassword'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <sc.InputPassword
                  id='signInPassword'
                  onPressEnter={fieldProps.handleSubmit}
                  prefix={<sc.InputIcon type='lock' />}
                  {...fieldProps.field}
                />
              </sc.FormItem>
            )}
          </Field>

          {error && <DisplayError error={error} />}

          <sc.FormItemBtn>
            <sc.SubmitBtn
              loading={loading}
              type='primary'
              htmlType='submit'
              disabled={
                !formikProps.values.email ||
                !formikProps.values.password ||
                formikProps.errors.email ||
                formikProps.errors.password ||
                formikProps.isSubmitting
              }
            >
              Sign In
            </sc.SubmitBtn>
          </sc.FormItemBtn>
        </sc.SignInForm>
      )}
    </Formik>
  );
};

export default SignInForm;
