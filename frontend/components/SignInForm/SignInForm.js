import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import DisplayError from '../DisplayError/DisplayError';
import { SIGN_IN_MUTATION } from '../../graphql/queries';
import * as sc from './SignInForm.style';

const SignInForm = React.memo(props => {
  const {
    form: {
      validateFields,
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      resetFields
    }
  } = props;

  useEffect(() => {
    validateFields();
  }, []);

  const handleUpdate = cache => cache.writeData({ data: { isLoggedIn: true } });

  // Suppress console output
  const handleError = err => err;

  const [signIn, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
    update(cache) {
      handleUpdate(cache);
    },
    onError(err) {
      handleError(err);
    }
  });

  const hasErrors = fieldsError =>
    Object.keys(fieldsError).some(field => fieldsError[field]);

  const handleSubmitForm = e => {
    e.preventDefault();

    validateFields((err, values) => {
      signIn({ variables: values });

      resetFields();
    });
  };

  // Only show error after a field is touched.
  const emailError = isFieldTouched('email') && getFieldError('email');
  const passwordError = isFieldTouched('password') && getFieldError('password');

  return (
    <sc.SignInForm onSubmit={handleSubmitForm}>
      <h2>Sign In</h2>

      <sc.FormItem
        validateStatus={emailError ? 'error' : ''}
        help={emailError || ''}
        hasFeedback
      >
        {getFieldDecorator('email', {
          initialValue: 'user@email.com',
          rules: [
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Not a valid email address' }
          ]
        })(
          <sc.InputEmail
            type="email"
            placeholder="email"
            onPressEnter={handleSubmitForm}
            prefix={<sc.InputIcon type="user" />}
          />
        )}
      </sc.FormItem>

      <sc.FormItem
        validateStatus={passwordError ? 'error' : ''}
        help={passwordError || ''}
        hasFeedback
      >
        {getFieldDecorator('password', {
          initialValue: 'User123#',
          rules: [{ required: true, message: 'Please enter your password' }]
        })(
          <sc.InputPassword
            placeholder="password"
            onPressEnter={handleSubmitForm}
            prefix={<sc.InputIcon type="lock" />}
          />
        )}
      </sc.FormItem>

      {error && <DisplayError error={error} />}

      <sc.FormItem>
        <sc.SubmitBtn
          loading={loading}
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          Sign In
        </sc.SubmitBtn>
      </sc.FormItem>
    </sc.SignInForm>
  );
});

SignInForm.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    isFieldTouched: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired
  }).isRequired
};

export default sc.SignInForm.create({ name: 'SignInForm' })(SignInForm);
