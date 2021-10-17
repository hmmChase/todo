import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = props => {
  const { children, onClick, className, loading, disabled, type } = props;

  return (
    <Buttonn
      aria-label={props['aria-label']}
      data-testid={props['data-testid']}
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? `${children}...` : children}
    </Buttonn>
  );
};

Button.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'text']).isRequired,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool
};

export default Button;

const Buttonn = styled.button`
  background-color: ${props => props.theme.buttons.actionButton};
  border-radius: ${props => props.theme.buttons.borderRadius};
  border: none;
  color: ${props => props.theme.colors.text.secondaryText};
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.buttons.actionButtonHover};
  }

  &:active {
    padding: 0.6rem 1rem 0.4rem 1rem;
  }
`;
