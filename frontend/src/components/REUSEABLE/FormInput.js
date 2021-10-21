import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormInput = props => {
  const { id, label, name } = props;

  const fieldId = `${id}-${name}`;

  return (
    <>
      {label && <Label htmlFor={fieldId}>{label}</Label>}

      <Input {...props} id={fieldId} aria-label={name} data-testid={name} />
    </>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default FormInput;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5rem;
`;
