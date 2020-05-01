import PropTypes from 'prop-types';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Form as FormikForm, Formik, Field } from 'formik';
import { Form, Input, List, Typography } from 'antd';
import * as yup from 'yup';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import { SIGN_UP } from '../../../graphql/queries';
import { setAccessToken } from '../../../utils/accessToken';
import { passwordRequirements } from '../../../config';
import Button from '../../atoms/Button/Button';
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
    .required('Required'),
});

const SignUp = (props) => {
  const handleCompleted = (data) => {
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
    onError(_error) {},
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
      {(formikProps) => (
        <FormikForm className={props.className}>
          <h2>Create a new Account</h2>

          <Field name='email'>
            {(fieldProps) => (
              <Form.Item
                label='Email'
                htmlFor='signUpEmail'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <Input
                  id='signUpEmail'
                  type='email'
                  onPressEnter={fieldProps.handleSubmit}
                  {...fieldProps.field}
                />
              </Form.Item>
            )}
          </Field>

          <Field name='password'>
            {(fieldProps) => (
              <Form.Item
                label='Password'
                htmlFor='signUpPassword'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <Input.Password
                  id='signUpPassword'
                  onPressEnter={fieldProps.handleSubmit}
                  {...fieldProps.field}
                />
              </Form.Item>
            )}
          </Field>

          <Field name='confirmPassword'>
            {(fieldProps) => (
              <Form.Item
                label='Confirm Password'
                htmlFor='signUpConfirmPassword'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <Input.Password
                  id='signUpConfirmPassword'
                  onPressEnter={fieldProps.handleSubmit}
                  {...fieldProps.field}
                />
              </Form.Item>
            )}
          </Field>

          {error && <DisplayError error={error} />}

          <sc.PassListContainer data-testid='passList'>
            <Typography.Text strong>
              {passwordRequirements.title}
            </Typography.Text>

            <List
              split={false}
              dataSource={passwordRequirements.reqs}
              renderItem={(item) => (
                <sc.PassListItem>
                  <Typography.Text>{item}</Typography.Text>
                </sc.PassListItem>
              )}
            />
          </sc.PassListContainer>

          <sc.FormItemBtn>
            <Button
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
            </Button>
          </sc.FormItemBtn>
        </FormikForm>
      )}
    </Formik>
  );
};

SignUp.propTypes = {
  className: PropTypes.string,
};

export default SignUp;
