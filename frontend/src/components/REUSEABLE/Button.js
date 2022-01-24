import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Button = props => {
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

Button.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  alt: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['submit', 'text']).isRequired
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
