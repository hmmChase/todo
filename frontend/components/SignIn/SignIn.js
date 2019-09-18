import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';

import DisplayError from '../DisplayError/DisplayError';
import ForgotPassDialog from '../ForgotPassDialog/ForgotPassDialog';
import { SIGN_IN_MUTATION } from '../../graphql/queries';
import * as sc from './SignIn.style';

class SignIn extends React.PureComponent {
  componentDidMount() {
    // Disable submit button at the beginning
    this.props.form.validateFields();
  }

  hasErrors = fieldsError =>
    Object.keys(fieldsError).some(field => fieldsError[field]);

  handleSubmitForm = (e, signIn) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      signIn({ variables: values });

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

    return (
      <Mutation
        mutation={SIGN_IN_MUTATION}
        onError={this.handleError}
        update={this.handleUpdate}
      >
        {(signIn, { loading, error }) => (
          <sc.SignIn onSubmit={e => this.handleSubmitForm(e, signIn)}>
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
                  onPressEnter={e => this.handleSubmitForm(e, signIn)}
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
                initialValue: 'User123#',
                rules: [
                  { required: true, message: 'Please enter your password' }
                ]
              })(
                <sc.InputPassword
                  placeholder="password"
                  onPressEnter={e => this.handleSubmitForm(e, signIn)}
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

            <sc.FormItem>
              <sc.SubmitBtn
                loading={loading}
                type="primary"
                htmlType="submit"
                disabled={this.hasErrors(getFieldsError())}
              >
                Sign In
              </sc.SubmitBtn>
            </sc.FormItem>

            <ForgotPassDialog />
          </sc.SignIn>
        )}
      </Mutation>
    );
  }
}

SignIn.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    isFieldTouched: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired
  }).isRequired
};

export default sc.SignIn.create({ name: 'SignIn' })(SignIn);
