import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Field, Form, useField, FieldArray } from 'formik';
import * as yup from 'yup';

import DisplayError from '../DisplayError/DisplayError';
import { SIGN_IN_MUTATION } from '../../graphql/queries';
import * as sc from './SignInForm.style';
import { setAccessToken } from '../../utils/authenticate';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),

  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .max(15, 'Must be 15 characters or less')
    .required('Required')
});

const SignInForm = props => {
  const handleCompleted = accessToken => {
    setAccessToken(accessToken);

    Router.push('/');
  };

  const [signIn, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted(data) {
      if (data && data.signIn && data.signIn.accessToken) {
        handleCompleted(data.signIn.accessToken);
      }
    }
  });

  const handleSubmitForm = async (values, formikHelpers) => {
    console.log('TCL: formikHelpers', formikHelpers);
    try {
      const response = await signIn({ variables: values });

      if (
        response &&
        response.data &&
        response.data.signIn &&
        response.data.signIn.accessToken
      ) {
        setAccessToken(response.data.signIn.accessToken);
      }
    } catch (err) {
      // console.log('TCL: err', JSON.stringify(err.graphQLErrors));
      err.graphQLErrors.forEach(graphQLError => {
        console.log('TCL: graphQLError', graphQLError);
        formikHelpers.setErrors({ graphQLError: graphQLError.message });
      });
    }

    // formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: 'user@email.com', password: 'User123#' }}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={handleSubmitForm}
    >
      {formikProps => {
        console.log('TCL: formikProps', formikProps.isSubmitting);

        return (
          <Form>
            <h2>Sign In</h2>

            <sc.InputEmail
              aria-label='email'
              type='email'
              placeholder='email'
              defaultValue={formikProps.initialValues.email}
              onPressEnter={formikProps.handleSubmit}
              prefix={<sc.InputIcon type='user' />}
              {...formikProps.getFieldProps('email')}
            />

            {formikProps.touched.email && formikProps.errors.email ? (
              <DisplayError error={{ message: formikProps.errors.email }} />
            ) : null}

            <sc.InputPassword
              aria-label='password'
              placeholder='password'
              defaultValue={formikProps.initialValues.password}
              onPressEnter={formikProps.handleSubmit}
              prefix={<sc.InputIcon type='lock' />}
              {...formikProps.getFieldProps('password')}
            />

            {formikProps.touched.password && formikProps.errors.password ? (
              <DisplayError error={{ message: formikProps.errors.password }} />
            ) : null}

            {formikProps.errors.graphQLError ? (
              <DisplayError
                error={{ message: formikProps.errors.graphQLError }}
              />
            ) : null}

            <sc.SubmitBtn
              loading={formikProps.isSubmitting}
              type='primary'
              htmlType='submit'
              disabled={
                formikProps.isSubmitting ||
                formikProps.errors.email ||
                formikProps.errors.password
              }
            >
              Sign In
            </sc.SubmitBtn>

            <pre>values: {JSON.stringify(formikProps.values, null, 2)}</pre>
            <pre>touched: {JSON.stringify(formikProps.touched, null, 2)}</pre>
            <pre>errors: {JSON.stringify(formikProps.errors, null, 2)}</pre>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignInForm;

// ---------- Ant Design form validation ----------

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
