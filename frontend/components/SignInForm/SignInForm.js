import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import DisplayError from '../DisplayError/DisplayError';
import { SIGN_IN_MUTATION } from '../../graphql/queries';
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

  const [signIn, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
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

// ---------- Ant Design form validation ----------

// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Router from 'next/router';
// import { useMutation } from '@apollo/react-hooks';
// import DisplayError from '../DisplayError/DisplayError';
// import { SIGN_IN_MUTATION } from '../../graphql/queries';
// import * as sc from './SignInForm.style';
// import { setAccessToken } from '../../utils/authenticate';

// const SignInForm = props => {
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

//   const handleCompleted = accessToken => {
//     setAccessToken(accessToken);

//     Router.push('/');
//   };

//   // Suppress console output
//   const handleError = err => err;

//   const [signIn, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
//     onCompleted(data) {
//       if (data && data.signIn && data.signIn.accessToken) {
//         handleCompleted(data.signIn.accessToken);
//       }
//     },
//     onError(err) {
//       handleError(err);
//     }
//   });

//   const hasErrors = fieldsError =>
//     Object.keys(fieldsError).some(field => fieldsError[field]);

//   const handleSubmitForm = e => {
//     e.preventDefault();

//     validateFields((err, values) => {
//       const response = signIn({ variables: values });

//       if (
//         response &&
//         response.data &&
//         response.data.signIn &&
//         response.data.signIn.accessToken
//       ) {
//         setAccessToken(response.data.signIn.accessToken);
//       }

//       resetFields();
//     });
//   };

//   // Only show error after a field is touched.
//   const emailError = isFieldTouched('email') && getFieldError('email');
//   const passwordError = isFieldTouched('password') && getFieldError('password');

//   return (
//     <sc.SignInForm onSubmit={handleSubmitForm}>
//       <h2>Sign In</h2>

//       <sc.FormItem
//         validateStatus={emailError ? 'error' : ''}
//         help={emailError || ''}
//         hasFeedback
//       >
//         {getFieldDecorator('email', {
//           initialValue: 'user@email.com',
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

//       <sc.FormItem
//         validateStatus={passwordError ? 'error' : ''}
//         help={passwordError || ''}
//         hasFeedback
//       >
//         {getFieldDecorator('password', {
//           initialValue: 'User123#',
//           rules: [{ required: true, message: 'Please enter your password' }]
//         })(
//           <sc.InputPassword
//             aria-label='password'
//             placeholder='password'
//             onPressEnter={handleSubmitForm}
//             prefix={<sc.InputIcon type='lock' />}
//           />
//         )}
//       </sc.FormItem>

//       {error && <DisplayError error={error} />}

//       <sc.FormItem>
//         <sc.SubmitBtn
//           loading={loading}
//           type='primary'
//           htmlType='submit'
//           disabled={hasErrors(getFieldsError())}
//         >
//           Sign In
//         </sc.SubmitBtn>
//       </sc.FormItem>
//     </sc.SignInForm>
//   );
// };

// SignInForm.propTypes = {
//   form: PropTypes.shape({
//     validateFields: PropTypes.func.isRequired,
//     getFieldDecorator: PropTypes.func.isRequired,
//     getFieldsError: PropTypes.func.isRequired,
//     getFieldError: PropTypes.func.isRequired,
//     isFieldTouched: PropTypes.func.isRequired,
//     resetFields: PropTypes.func.isRequired
//   }).isRequired
// };

// export default sc.SignInForm.create({ name: 'SignInForm' })(
//   React.memo(SignInForm)
// );
