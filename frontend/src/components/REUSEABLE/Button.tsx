import { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  'aria-label'?: string;
  'data-testid'?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  alt?: string;
  type: 'submit' | 'text';
  loading?: boolean;
  children: ReactNode;
}

const Button: FC<Props> = props => {
  const { className, disabled, onClick, alt, type, loading, children } = props;

  return (
    <Buttonn
      aria-label={props['aria-label']}
      data-testid={props['data-testid']}
      className={className}
      disabled={disabled}
      onClick={onClick}
      $alt={alt}
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
