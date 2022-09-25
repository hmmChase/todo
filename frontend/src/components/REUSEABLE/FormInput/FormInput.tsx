import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  HTMLInputTypeAttribute
} from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  label?: string;
  name: string;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
  value: string;
}

const FormInput: FC<Props> = ({
  id,
  label,
  name,
  onBlur,
  onChange,
  type,
  value
}) => {
  const fieldId = `${id}-${name}`;

  return (
    <>
      {label && <Label htmlFor={fieldId}>{label}</Label>}

      <Input
        aria-label={name}
        data-testid={name}
        id={fieldId}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        value={value}
      />
    </>
  );
};

export default FormInput;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
`;

export const Input = styled.input`
  border-radius: ${props => props.theme.borderRadius.primary};
  border: none;
  padding: 0.5rem;
`;
