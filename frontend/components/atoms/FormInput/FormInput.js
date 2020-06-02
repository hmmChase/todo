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
          id={props.id}
          name={props.name}
          value={fieldProps.field.value}
          onChange={fieldProps.field.onChange}
          onBlur={fieldProps.field.onBlur}
          // onPressEnter={fieldProps.form.handleSubmit}
        />
      </Form.Item>
    )}
  </Field>
);

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default React.memo(FormInput);
