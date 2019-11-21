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
    { onError(_err) {} }
  );

  const handleSubmitForm = (values, formikHelpers) => {
    console.log('TCL: values', values);
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

// ---------- Ant Design form validation ----------

// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useMutation } from '@apollo/react-hooks';
// import DisplayError from '../DisplayError/DisplayError';
// import DisplaySuccess from '../DisplaySuccess/DisplaySuccess';
// import { REQUEST_RESET } from '../../graphql/queries';
// import * as sc from './RequestReset.style';

// const RequestReset = props => {
//   const {
//     form: {
//       validateFields,
//       getFieldDecorator,
//       getFieldsError,
//       getFieldError,
//       isFieldTouched,
//       resetFields
//     }
//   } = props;

//   useEffect(() => {
//     validateFields();
//   }, [validateFields]);

//   // Suppress console output
//   const handleError = err => err;

//   const [requestReset, { loading, error, called }] = useMutation(
//     REQUEST_RESET,
//     {
//       onError(err) {
//         handleError(err);
//       }
//     }
//   );

//   const hasErrors = fieldsError =>
//     Object.keys(fieldsError).some(field => fieldsError[field]);

//   const handleSubmitForm = e => {
//     e.preventDefault();

//     validateFields((err, values) => {
//       requestReset({ variables: values });

//       resetFields();
//     });
//   };

//   // Only show error after a field is touched.
//   const emailError = isFieldTouched('email') && getFieldError('email');

//   return (
//     <sc.RequestReset onSubmit={handleSubmitForm}>
//       <sc.FormItem
//         validateStatus={emailError ? 'error' : ''}
//         help={emailError || ''}
//         hasFeedback
//       >
//         {getFieldDecorator('email', {
//           rules: [
//             { required: true, message: 'Please enter your email' },
//             { type: 'email', message: 'Not a valid email address' }
//           ]
//         })(
//           <sc.InputEmail
//             aria-label='email'
//             type='email'
//             placeholder='email'
//             onPressEnter={handleSubmitForm}
//             prefix={<sc.InputIcon type='user' />}
//           />
//         )}
//       </sc.FormItem>

//       {error && <DisplayError error={error} />}

//       {!error && !loading && called && (
//         <DisplaySuccess message='Check your email for a reset link.' />
//       )}

//       <sc.FormItem>
//         <sc.SubmitBtn
//           loading={loading}
//           type='primary'
//           htmlType='submit'
//           disabled={hasErrors(getFieldsError())}
//         >
//           Submit
//         </sc.SubmitBtn>
//       </sc.FormItem>
//     </sc.RequestReset>
//   );
// };

// RequestReset.propTypes = {
//   form: PropTypes.shape({
//     validateFields: PropTypes.func.isRequired,
//     getFieldDecorator: PropTypes.func.isRequired,
//     getFieldsError: PropTypes.func.isRequired,
//     getFieldError: PropTypes.func.isRequired,
//     isFieldTouched: PropTypes.func.isRequired,
//     resetFields: PropTypes.func.isRequired
//   }).isRequired
// };

// export default sc.RequestReset.create({ name: 'RequestReset' })(
//   React.memo(RequestReset)
// );
