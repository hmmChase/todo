import styled, { css } from 'styled-components';
import type { ButtonHTMLAttributes } from 'react';

interface Props {
  alt?: boolean;
  children: ButtonHTMLAttributes<HTMLButtonElement>['children'];
  className?: ButtonHTMLAttributes<HTMLButtonElement>['className'];
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>['disabled'];
  loading?: boolean;
  name: ButtonHTMLAttributes<HTMLButtonElement>['name'];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const Button = ({
  alt,
  children,
  className,
  disabled,
  loading,
  name,
  onClick,
  type = 'button'
}: Props) => {
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

interface scProps {
  $alt?: boolean;
}

const Buttonn = styled.button<scProps>`
  ${({ $alt, theme }) => css`
    background-color: ${theme.button.background};
    border-radius: ${theme.button.borderRadius};
    border: none;
    color: ${theme.button.color};
    cursor: pointer;
    font-weight: bold;
    padding: 0.5rem 1rem;
    &:active {
      background-color: ${theme.button.background};
    }

    &:disabled {
      background-color: ${theme.button.disabled.background};
      color: ${theme.button.disabled.color};
      cursor: not-allowed;
    }

    &:hover {
      background-color: ${theme.button.hover.background};
    }

    ${$alt &&
    css`
      background-color: ${theme.button.alt.background};
      color: ${theme.text.primary};

      &:active {
        background-color: ${theme.button.alt.background};
      }

      &:hover {
        background-color: ${theme.button.alt.hover.background};
      }
    `}
  `}
`;
