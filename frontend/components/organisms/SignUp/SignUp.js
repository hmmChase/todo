import Router from 'next/router';
import { Formik, Field } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import * as yup from 'yup';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import { SIGN_UP } from '../../../graphql/queries';
import { setAccessToken } from '../../../utils/accessToken';
import { passwordRequirements } from '../../../constants';
import * as sc from './SignUp.style';

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

  confirmPassword: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .max(255, 'Must be 255 characters or less')
    .required('Required')
});

const SignUp = () => {
  const handleCompleted = data => {
    if (data && data.signUp && data.signUp.accessToken) {
      setAccessToken(data.signUp.accessToken);

      Router.push('/');
    }
  };

  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    update(cache) {
      cache.writeData({ data: { isLoggedIn: true } });
    },
    onCompleted(data) {
      handleCompleted(data);
    },
    onError(_error) {}
  });

  const handleSubmitForm = async (values, formikHelpers) => {
    signUp({ variables: values });

    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={handleSubmitForm}
    >
      {formikProps => (
        <sc.SignUpForm>
          <h2>Create a new Account</h2>

          <Field name='email'>
            {fieldProps => (
              <sc.FormItem
                label='Email'
                htmlFor='signUpEmail'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <sc.InputEmail
                  id='signUpEmail'
                  type='email'
                  onPressEnter={fieldProps.handleSubmit}
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
                htmlFor='signUpPassword'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <sc.InputPassword
                  id='signUpPassword'
                  onPressEnter={fieldProps.handleSubmit}
                  prefix={<sc.InputIcon type='lock' />}
                  {...fieldProps.field}
                />
              </sc.FormItem>
            )}
          </Field>

          <Field name='confirmPassword'>
            {fieldProps => (
              <sc.FormItem
                label='Confirm Password'
                htmlFor='signUpConfirmPassword'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <sc.InputPassword
                  id='signUpConfirmPassword'
                  onPressEnter={fieldProps.handleSubmit}
                  prefix={<sc.InputIcon type='lock' />}
                  {...fieldProps.field}
                />
              </sc.FormItem>
            )}
          </Field>

          {error && <DisplayError error={error} />}

          <sc.PassListContainer data-testid='passList'>
            <sc.TypographyText strong>
              {passwordRequirements.title}
            </sc.TypographyText>

            <sc.PassList
              split={false}
              dataSource={passwordRequirements.reqs}
              renderItem={item => (
                <sc.PassListItem>
                  <sc.ListIcon type='minus' />

                  <sc.TypographyText>{item}</sc.TypographyText>
                </sc.PassListItem>
              )}
            />
          </sc.PassListContainer>

          <sc.FormItemBtn>
            <sc.SubmitBtn
              aria-label='submit button'
              loading={loading}
              type='primary'
              htmlType='submit'
              disabled={
                !formikProps.values.email ||
                !formikProps.values.password ||
                !formikProps.values.confirmPassword ||
                formikProps.errors.email ||
                formikProps.errors.password ||
                formikProps.errors.confirmPassword ||
                formikProps.isSubmitting
              }
            >
              Sign Up
            </sc.SubmitBtn>
          </sc.FormItemBtn>
        </sc.SignUpForm>
      )}
    </Formik>
  );
};

export default SignUp;
