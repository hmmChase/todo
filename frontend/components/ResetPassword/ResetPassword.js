import PropTypes from 'prop-types';
// import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import DisplayError from '../DisplayError/DisplayError';
import DisplaySuccess from '../DisplaySuccess/DisplaySuccess';
import { RESET_PASSWORD_MUTATION } from '../../graphql/queries';
import { passwordRequirements } from '../../constants';
import * as sc from './ResetPassword.style';

const ResetPassword = props => {
  const {
    resetToken,
    resetTokenExpiry,
    form: {
      validateFields,
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      resetFields
    }
  } = props;

  // handleCompleted = () => Router.push({ pathname: '/' });

  const handleError = error => error;

  const [resetPassword, { loading, error, data }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      // onCompleted() {
      //   handleCompleted();
      // },
      onError(err) {
        handleError(err);
      }
    }
  );

  const hasErrors = fieldsError =>
    Object.keys(fieldsError).some(field => fieldsError[field]);

  const handleSubmitForm = e => {
    e.preventDefault();

    validateFields((err, values) => {
      resetPassword({
        variables: { ...values, resetToken: props.resetToken }
      });

      resetFields();
    });
  };

  const isTokenPresent = resetToken && resetTokenExpiry;
  const isTokenExpired = Date.now() > resetTokenExpiry;
  const isTokenValid = isTokenPresent && !isTokenExpired;

  const tokenMissingError = {
    message: 'Error: Please submit a new password reset request.'
  };
  const tokenExpiredError = {
    message: 'Your reset request is expired.  Please submit a new one.'
  };

  // Only show error after a field is touched.
  const passwordError = isFieldTouched('password') && getFieldError('password');
  const confirmPasswordError =
    isFieldTouched('confirmPassword') && getFieldError('confirmPassword');

  return (
    <sc.ResetPassword onSubmit={handleSubmitForm}>
      <sc.FormItem
        validateStatus={passwordError ? 'error' : ''}
        help={passwordError || ''}
        hasFeedback
      >
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please enter your password' }]
        })(
          <sc.InputPassword
            aria-label='password'
            placeholder='password'
            onPressEnter={handleSubmitForm}
            prefix={
              <sc.InputIcon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
            }
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
            aria-label='confirm password'
            placeholder='confirm password'
            onPressEnter={handleSubmitForm}
            prefix={
              <sc.InputIcon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
            }
          />
        )}
      </sc.FormItem>

      {!isTokenPresent && <DisplayError error={tokenMissingError} />}

      {isTokenPresent && isTokenExpired && (
        <DisplayError error={tokenExpiredError} />
      )}

      {isTokenValid && error && <DisplayError error={error} />}

      {data && data.resetPassword && (
        <DisplaySuccess message='Your password has been successfully changed.' />
      )}

      <sc.TypographyText strong>{passwordRequirements.title}</sc.TypographyText>

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

      <sc.FormItem>
        <sc.SubmitBtn
          loading={loading}
          type='primary'
          htmlType='submit'
          disabled={hasErrors(getFieldsError())}
        >
          Submit
        </sc.SubmitBtn>
      </sc.FormItem>
    </sc.ResetPassword>
  );
};

ResetPassword.defaultProps = {
  resetToken: '',
  resetTokenExpiry: ''
};

ResetPassword.propTypes = {
  resetToken: PropTypes.string,
  resetTokenExpiry: PropTypes.string,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    isFieldTouched: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired
  }).isRequired
};

export default sc.ResetPassword.create({ name: 'ResetPassword' })(
  React.memo(ResetPassword)
);
