import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Form as FormikForm, Formik } from 'formik';
import * as yup from 'yup';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import { SIGN_IN } from '../../../graphql/queries';
import { setAccessToken } from '../../../utils/accessToken';
import FormInput from '../../atoms/FormInput/FormInput';
import FormInputPass from '../../atoms/FormInputPass/FormInputPass';
import Button from '../../atoms/Button/Button';
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
    .required('Required'),
});

const SignInForm = () => {
  const handleCompleted = (data) => {
    if (data && data.signIn && data.signIn.accessToken) {
      setAccessToken(data.signIn.accessToken);

      Router.push('/');
    }
  };

  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    update(cache) {
      cache.writeData({ data: { isLoggedIn: true } });
    },
    onCompleted(data) {
      handleCompleted(data);
    },
    onError(_error) {},
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
      {(formikProps) => (
        <FormikForm>
          <h2 data-testid='SignInFormTitle'>Sign In</h2>

          <FormInput label='Email' id='signInEmail' name='email' />

          <FormInputPass label='Password' id='signInPassword' name='password' />

          {/* <Field name='email'>
            {fieldProps => (
              <Form.Item
                label='Email'
                htmlFor='signInEmail'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <Input
                  id='signInEmail'
                  type='email'
                  onPressEnter={fieldProps.form.handleSubmit}
                  {...fieldProps.field}
                />
              </Form.Item>
            )}
          </Field> */}

          {/* <Field name='password'>
            {fieldProps => (
              <Form.Item
                label='Password'
                htmlFor='signInPassword'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <Input.Password
                  id='signInPassword'
                  onPressEnter={fieldProps.handleSubmit}
                  {...fieldProps.field}
                />
              </Form.Item>
            )}
          </Field> */}

          {error && <DisplayError error={error} />}

          <sc.FormItemBtn>
            <Button
              aria-label='submit button'
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
            </Button>
          </sc.FormItemBtn>
        </FormikForm>
      )}
    </Formik>
  );
};

export default SignInForm;
