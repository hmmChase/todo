import Router from 'next/router';
import { Formik, Field } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import * as yup from 'yup';
import DisplayError from '../DisplayError/DisplayError';
import { SIGN_UP } from '../../graphql/queries';
import { setAccessToken } from '../../utils/authenticate';
import { passwordRequirements } from '../../constants';
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
    onCompleted(data) {
      handleCompleted(data);
    },
    onError(_err) {}
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

          <sc.PassListContainer>
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

// ---------- Ant Design form validation ----------

// const SignUp = props => {
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
//   }, []);

//   // Suppress console output
//   const handleError = err => err;

//   const [signUp, { loading, error }] = useMutation(SIGN_UP, {
//     onError(err) {
//       handleError(err);
//     }
//   });

//   const hasErrors = fieldsError =>
//     Object.keys(fieldsError).some(field => fieldsError[field]);

//   const handleSubmitForm = e => {
//     e.preventDefault();

//     validateFields((err, values) => {
//       signUp({ variables: values });

//       resetFields();
//     });
//   };

//   // Only show error after a field is touched
//   const emailError = isFieldTouched('email') && getFieldError('email');
//   const passwordError = isFieldTouched('password') && getFieldError('password');
//   const confirmPasswordError = isFieldTouched('confirmPassword') && getFieldError('confirmPassword');

//   return (
//     <sc.SignUp onSubmit={handleSubmitForm}>
//       <h2>Create a new Account</h2>

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
//             aria-label="email"
//             type="email"
//             placeholder="email"
//             onPressEnter={handleSubmitForm}
//             prefix={<sc.InputIcon type="user" />}
//           />
//         )}
//       </sc.FormItem>

//       <sc.FormItem
//         validateStatus={passwordError ? 'error' : ''}
//         help={passwordError || ''}
//         hasFeedback
//       >
//         {getFieldDecorator('password', {
//           rules: [{ required: true, message: 'Please enter your password' }]
//         })(
//           <sc.InputPassword
//             aria-label="password"
//             placeholder="password"
//             onPressEnter={handleSubmitForm}
//             prefix={<sc.InputIcon type="lock" />}
//           />
//         )}
//       </sc.FormItem>

//       <sc.FormItem
//         validateStatus={confirmPasswordError ? 'error' : ''}
//         help={confirmPasswordError || ''}
//         hasFeedback
//       >
//         {getFieldDecorator('confirmPassword', {
//           rules: [{ required: true, message: 'Please confirm your password' }]
//         })(
//           <sc.InputConfirmPassword
//             aria-label="confirm password"
//             placeholder="confirm password"
//             onPressEnter={handleSubmitForm}
//             prefix={<sc.InputIcon type="lock" />}
//           />
//         )}
//       </sc.FormItem>

//       {error && <DisplayError error={error} />}

//       <sc.TypographyText strong>{passwordRequirements.title}</sc.TypographyText>

//       <sc.PassList
//         split={false}
//         dataSource={passwordRequirements.reqs}
//         renderItem={item => (
//           <sc.PassListItem>
//             <sc.ListIcon type="minus" />

//             <sc.TypographyText>{item}</sc.TypographyText>
//           </sc.PassListItem>
//         )}
//       />

//       <sc.FormItem>
//         <sc.SubmitBtn
//           loading={loading}
//           type="primary"
//           htmlType="submit"
//           disabled={hasErrors(getFieldsError())}
//         >
//           Sign Up
//         </sc.SubmitBtn>
//       </sc.FormItem>
//     </sc.SignUp>
//   );
// };

// SignUp.propTypes = {
//   form: PropTypes.shape({
//     validateFields: PropTypes.func.isRequired,
//     getFieldDecorator: PropTypes.func.isRequired,
//     getFieldsError: PropTypes.func.isRequired,
//     getFieldError: PropTypes.func.isRequired,
//     isFieldTouched: PropTypes.func.isRequired,
//     resetFields: PropTypes.func.isRequired
//   }).isRequired
// };

// export default sc.SignUp.create({ name: 'SignUp' })(React.memo(SignUp));
