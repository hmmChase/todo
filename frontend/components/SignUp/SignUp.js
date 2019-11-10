import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import DisplayError from '../DisplayError/DisplayError';
import { SIGN_UP_MUTATION } from '../../graphql/queries';
import { passwordRequirements } from '../../constants';
import * as sc from './SignUp.style';

const SignUp = props => {
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

  // Suppress console output
  const handleError = err => err;

  const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION, {
    onError(err) {
      handleError(err);
    }
  });

  const hasErrors = fieldsError =>
    Object.keys(fieldsError).some(field => fieldsError[field]);

  const handleSubmitForm = e => {
    e.preventDefault();

    validateFields((err, values) => {
      signUp({ variables: values });

      resetFields();
    });
  };

  // Only show error after a field is touched
  const emailError = isFieldTouched('email') && getFieldError('email');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  const confirmPasswordError = isFieldTouched('confirmPassword') && getFieldError('confirmPassword');

  return (
    <sc.SignUp onSubmit={handleSubmitForm}>
      <h2>Create a new Account</h2>

      <sc.FormItem
        validateStatus={emailError ? 'error' : ''}
        help={emailError || ''}
        hasFeedback
      >
        {getFieldDecorator('email', {
          rules: [
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Not a valid email address' }
          ]
        })(
          <sc.InputEmail
            aria-label="email"
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
          rules: [{ required: true, message: 'Please enter your password' }]
        })(
          <sc.InputPassword
            aria-label="password"
            placeholder="password"
            onPressEnter={handleSubmitForm}
            prefix={<sc.InputIcon type="lock" />}
          />
        )}
      </sc.FormItem>

      <sc.FormItem
        validateStatus={confirmPasswordError ? 'error' : ''}
        help={confirmPasswordError || ''}
        hasFeedback
      >
        {getFieldDecorator('confirmPassword', {
          rules: [{ required: true, message: 'Please confirm your password' }]
        })(
          <sc.InputConfirmPassword
            aria-label="confirm password"
            placeholder="confirm password"
            onPressEnter={handleSubmitForm}
            prefix={<sc.InputIcon type="lock" />}
          />
        )}
      </sc.FormItem>

      {error && <DisplayError error={error} />}

      <sc.TypographyText strong>{passwordRequirements.title}</sc.TypographyText>

      <sc.PassList
        split={false}
        dataSource={passwordRequirements.reqs}
        renderItem={item => (
          <sc.PassListItem>
            <sc.ListIcon type="minus" />

            <sc.TypographyText>{item}</sc.TypographyText>
          </sc.PassListItem>
        )}
      />

      <sc.FormItem>
        <sc.SubmitBtn
          loading={loading}
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          Sign Up
        </sc.SubmitBtn>
      </sc.FormItem>
    </sc.SignUp>
  );
};

SignUp.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    isFieldTouched: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired
  }).isRequired
};

export default sc.SignUp.create({ name: 'SignUp' })(React.memo(SignUp));
