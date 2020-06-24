import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Form } from 'antd';
import Input from '../Input/Input';

const FormInput = (props) => (
  <Field name={props.name}>
    {(fieldProps) => (
      <Form.Item
        label={props.label}
        htmlFor={props.id}
        help={fieldProps.meta.touched && fieldProps.meta.error}
        validateStatus={
          fieldProps.meta.touched && fieldProps.meta.error ? 'error' : ''
        }
      >
        <Input
          aria-label={props['aria-label']}
          data-testid={props['data-testid']}
          className={props.className}
          id={props.id}
          name={props.name}
          value={fieldProps.field.value}
          onChange={fieldProps.field.onChange}
          onBlur={fieldProps.field.onBlur}
        />
      </Form.Item>
    )}
  </Field>
);

FormInput.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default React.memo(FormInput);
