import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { Form as FormikForm, Formik } from 'formik';
import { object } from 'yup';
import { email } from '../../../utils/validation';
import { REQUEST_RESET } from '../../../graphql/queries';
import FormInput from '../../atoms/FormInput/FormInput';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import DisplaySuccess from '../../molecules/DisplaySuccess/DisplaySuccess';
import Button from '../../atoms/Button/Button';
import * as sc from './RequestReset.style';

const validationSchema = object().shape(email);

const RequestReset = () => {
  const [requestReset, { loading, error, data, called }] = useMutation(
    REQUEST_RESET,

    { onError(_error) {} }
  );

  const onSubmit = (values, formikHelpers) => {
    requestReset({ variables: values });

    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <FormikForm>
          <FormInput label='Email' id='requestResetEmail' name='email' />

          {error && <DisplayError error={error} />}

          {!loading && !error && called && data && data.requestReset && (
            <DisplaySuccess message='Check your email for a reset link.' />
          )}

          <sc.FormItemBtn>
            <Button
              ariaLabel='submit button'
              loading={loading}
              type='primary'
              htmlType='submit'
              disabled={
                !!(
                  !formikProps.values.email ||
                  formikProps.errors.email ||
                  formikProps.isSubmitting
                )
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
