import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  label?: string;
  name: string;
  type?: string;
}

const FormInput: FC<Props> = props => {
  const { id, label, name, type } = props;

  const fieldId = `${id}-${name}`;

  return (
    <>
      {label && <Label htmlFor={fieldId}>{label}</Label>}

      <Input
        {...props}
        id={fieldId}
        aria-label={name}
        data-testid={name}
        type={type}
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
  border: none;
  border-radius: ${props => props.theme.borderRadius.primary};
  padding: 0.5rem;
`;
