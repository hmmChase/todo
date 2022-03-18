import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  alt?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  name: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const Button: FC<Props> = ({
  alt,
  children,
  className,
  disabled,
  loading,
  name,
  onClick,
  type
}) => {
  return (
    <Buttonn
      $alt={alt}
      aria-label={name}
      className={className}
      data-testid={name}
      disabled={disabled}
      name={name}
      onClick={onClick}
      type={type}
    >
      {loading ? `${children}...` : children}
    </Buttonn>
  );
};

export default Button;

const Buttonn = styled.button`
  background-color: ${props =>
    props.$alt
      ? props.theme.background.primary
      : props.theme.background.quaternary};
  border-radius: ${props => props.theme.borderRadius.primary};
  border: none;
  color: ${props =>
    props.$alt ? props.theme.text.primary : props.theme.text.secondary};
  cursor: pointer;
  font-weight: bold;
  padding: 0.5rem 1rem;

  ${props =>
    !props.$alt &&
    css`
      text-shadow: 1px 1px 1px ${props.theme.text.quinary};
    `}

  &:hover {
    background-color: ${props =>
      props.$alt
        ? props.theme.background.senary
        : props.theme.background.quinary};
  }

  &:active {
    background-color: ${props =>
      props.$alt
        ? props.theme.background.primary
        : props.theme.background.quaternary};
  }
`;
