import PropTypes from 'prop-types';
import { Field } from 'formik';
import Input from '../Input/Input';

const FormInput = props => (
  <Field name={props.name}>
    {fieldProps => (
      <label
        htmlFor={props.id}
        help={fieldProps.meta.touched && fieldProps.meta.error}
        validateStatus={
          fieldProps.meta.touched && fieldProps.meta.error ? 'error' : ''
        }
      >
        {props.label}

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
      </label>
    )}
  </Field>
);

FormInput.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default React.memo(FormInput);
