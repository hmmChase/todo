import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Form } from 'antd';
import InputPass from '../InputPass/InputPass';

const FormInputPass = props => (
  <Field name={props.name}>
    {fieldProps => (
      <Form.Item
        label={props.label}
        htmlFor={props.id}
        help={fieldProps.meta.touched && fieldProps.meta.error}
        validateStatus={
          fieldProps.meta.touched && fieldProps.meta.error ? 'error' : ''
        }
      >
        <InputPass
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

FormInputPass.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default React.memo(FormInputPass);
