import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import DisplayError from '../DisplayError/DisplayError';
import DisplaySuccess from '../DisplaySuccess/DisplaySuccess';
import { REQUEST_RESET_MUTATION } from '../../graphql/queries';
import * as sc from './RequestReset.style';

const RequestReset = React.memo(props => {
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

  const [requestReset, { loading, error, called }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
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
      requestReset({ variables: values });

      resetFields();
    });
  };

  // Only show error after a field is touched.
  const emailError = isFieldTouched('email') && getFieldError('email');

  return (
    <sc.RequestReset onSubmit={handleSubmitForm}>
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
            onPressEnter={handleSubmitForm}
            prefix={<sc.InputIcon type="user" />}
          />
        )}
      </sc.FormItem>

      {error && <DisplayError error={error} />}

      {!error && !loading && called && (
        <DisplaySuccess message="Check your email for a reset link." />
      )}

      <sc.FormItem>
        <sc.SubmitBtn
          loading={loading}
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          Submit
        </sc.SubmitBtn>
      </sc.FormItem>
    </sc.RequestReset>
  );
});

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
