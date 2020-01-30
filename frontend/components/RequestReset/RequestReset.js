import { Formik, Field } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import * as yup from 'yup';
import DisplayError from '../DisplayError/DisplayError';
import DisplaySuccess from '../DisplaySuccess/DisplaySuccess';
import { REQUEST_RESET } from '../../graphql/queries';
import * as sc from './RequestReset.style';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .max(255, 'Must be 255 characters or less')
    .required('Required')
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
      {formikProps => (
        <sc.RequestReset>
          <Field name='email'>
            {fieldProps => (
              <sc.FormItem
                label='Email'
                htmlFor='requestResetEmail'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <sc.InputEmail
                  id='requestResetEmail'
                  type='email'
                  onPressEnter={fieldProps.handleSubmit}
                  prefix={<sc.InputIcon type='user' />}
                  {...fieldProps.field}
                />
              </sc.FormItem>
            )}
          </Field>

          {error && <DisplayError error={error} />}

          {!error && !loading && called && (
            <DisplaySuccess message='Check your email for a reset link.' />
          )}

          <sc.FormItemBtn>
            <sc.SubmitBtn
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
            </sc.SubmitBtn>
          </sc.FormItemBtn>
        </sc.RequestReset>
      )}
    </Formik>
  );
};

export default RequestReset;
