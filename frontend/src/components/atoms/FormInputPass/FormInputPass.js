import PropTypes from 'prop-types';
import { Field } from 'formik';
import InputPass from '../InputPass/InputPass';

const FormInputPass = props => (
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

        <InputPass
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

FormInputPass.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default React.memo(FormInputPass);
