import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';

import DisplayError from '../DisplayError/DisplayError';
import { SIGN_UP_MUTATION } from '../../graphql/queries';
import { passwordRequirements } from '../../constants';
import * as sc from './SignUp.style';

class SignUp extends React.PureComponent {
  componentDidMount() {
    // Disable submit button at the beginning
    this.props.form.validateFields();
  }

  hasErrors = fieldsError =>
    Object.keys(fieldsError).some(field => fieldsError[field]);

  handleSubmitForm = (e, signUp) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      signUp({ variables: values });

      this.props.form.resetFields();
    });
  };

  handleUpdate = cache => cache.writeData({ data: { isLoggedIn: true } });

  handleError = error => error;

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmPasswordError = isFieldTouched('confirmPassword') && getFieldError('confirmPassword');

    return (
      <Mutation
        mutation={SIGN_UP_MUTATION}
        onError={this.handleError}
        update={this.handleUpdate}
      >
        {(signUp, { loading, error }) => (
          <sc.SignUp onSubmit={e => this.handleSubmitForm(e, signUp)}>
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
                  type="email"
                  placeholder="email"
                  onPressEnter={e => this.handleSubmitForm(e, signUp)}
                  prefix={(
                    <sc.InputIcon
                      type="user"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  )}
                />
              )}
            </sc.FormItem>

            <sc.FormItem
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
              hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please enter your password' }
                ]
              })(
                <sc.InputPassword
                  placeholder="password"
                  onPressEnter={e => this.handleSubmitForm(e, signUp)}
                  prefix={(
                    <sc.InputIcon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  )}
                />
              )}
            </sc.FormItem>

            <sc.FormItem
              validateStatus={confirmPasswordError ? 'error' : ''}
              help={confirmPasswordError || ''}
              hasFeedback
            >
              {getFieldDecorator('confirmPassword', {
                rules: [
                  { required: true, message: 'Please confirm your password' }
                ]
              })(
                <sc.InputConfirmPassword
                  placeholder="confirm password"
                  onPressEnter={e => this.handleSubmitForm(e, signUp)}
                  prefix={(
                    <sc.InputIcon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  )}
                />
              )}
            </sc.FormItem>

            {error && <DisplayError error={error} />}

            <sc.TypographyText strong>
              {passwordRequirements.title}
            </sc.TypographyText>

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
                disabled={this.hasErrors(getFieldsError())}
              >
                Sign Up
              </sc.SubmitBtn>
            </sc.FormItem>
          </sc.SignUp>
        )}
      </Mutation>
    );
  }
}

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

export default sc.SignUp.create({ name: 'SignUp' })(SignUp);
