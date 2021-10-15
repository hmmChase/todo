import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = props => (
  <Buttonn
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
    className={props.className}
    type={props.type}
    onClick={props.onClick}
    // disabled={props.disabled}
    // htmlType={props.htmlType}
    // loading={props.loading}
  >
    {props.children}
  </Buttonn>
);

Button.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'text']).isRequired,
  onClick: PropTypes.func
  // children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  // disabled: PropTypes.bool,
  // htmlType: PropTypes.oneOf(['submit']),
  // loading: PropTypes.bool,
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
