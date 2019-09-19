import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import DisplayError from '../DisplayError/DisplayError';
import { REQUEST_RESET_MUTATION } from '../../graphql/queries';
import * as sc from './RequestReset.style';

class RequestReset extends React.PureComponent {
  componentDidMount() {
    // Disable submit button at the beginning
    this.props.form.validateFields();
  }

  hasErrors = fieldsError =>
    Object.keys(fieldsError).some(field => fieldsError[field]);

  handleSubmitForm = (e, requestReset) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      requestReset({ variables: values });

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

    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
        onError={this.handleError}
      >
        {(requestReset, { loading, error, called }) => (
          <sc.RequestReset
            onSubmit={e => this.handleSubmitForm(e, requestReset)}
          >
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

            {error && <DisplayError error={error} />}

            {!error && !loading && called && (
              <p>Check your email for a reset link.</p>
            )}

            <sc.FormItem>
              <sc.SubmitBtn
                loading={loading}
                type="primary"
                htmlType="submit"
                disabled={this.hasErrors(getFieldsError())}
              >
                Submit
              </sc.SubmitBtn>
            </sc.FormItem>
          </sc.RequestReset>
        )}
      </Mutation>
    );
  }
}

RequestReset.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    isFieldTouched: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired
  }).isRequired
};

export default sc.RequestReset.create({ name: 'RequestReset' })(RequestReset);
