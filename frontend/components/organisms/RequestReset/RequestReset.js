import { Form as FormikForm, Formik, Field } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { Form, Input } from 'antd';
import * as yup from 'yup';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import DisplaySuccess from '../../molecules/DisplaySuccess/DisplaySuccess';
import { REQUEST_RESET } from '../../../graphql/queries';
import Button from '../../atoms/Button/Button';
import * as sc from './RequestReset.style';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .max(255, 'Must be 255 characters or less')
    .required('Required'),
});

const RequestReset = () => {
  const [requestReset, { loading, error, called }] = useMutation(
    REQUEST_RESET,
    { onError(_error) {} }
  );

  const handleSubmitForm = (values, formikHelpers) => {
    requestReset({ variables: values });

    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={handleSubmitForm}
    >
      {(formikProps) => (
        <FormikForm>
          <Field name='email'>
            {(fieldProps) => (
              <Form.Item
                label='Email'
                htmlFor='requestResetEmail'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <Input
                  id='requestResetEmail'
                  type='email'
                  onPressEnter={fieldProps.handleSubmit}
                  {...fieldProps.field}
                />
              </Form.Item>
            )}
          </Field>

          {error && <DisplayError error={error} />}

          {!error && !loading && called && (
            <DisplaySuccess message='Check your email for a reset link.' />
          )}

          <sc.FormItemBtn>
            <Button
              aria-label='submit button'
              loading={loading}
              type='primary'
              htmlType='submit'
              disabled={
                !formikProps.values.email ||
                formikProps.errors.email ||
                formikProps.isSubmitting
              }
            >
              Submit
            </Button>
          </sc.FormItemBtn>
        </FormikForm>
      )}
    </Formik>
  );
};

export default RequestReset;
