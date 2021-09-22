import PropTypes from 'prop-types';

const FormInput = props => {
  const { label, id, name } = props;

  const fieldId = `${id}-${name}`;

  return (
    <>
      {label && <label htmlFor={fieldId}>{label}</label>}

      <input {...props} id={fieldId} aria-label={name} data-testid={name} />
    </>
  );
};

FormInput.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default FormInput;
