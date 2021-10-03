// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = props => (
  <Buttonn
  // aria-label={props['aria-label']}
  // data-testid={props['data-testid']}
  // className={props.className}
  // disabled={props.disabled}
  // htmlType={props.htmlType}
  // loading={props.loading}
  // onClick={props.onClick}
  // type={props.type}
  >
    {props.children}
  </Buttonn>
);

Button.propTypes = {
  // 'aria-label': PropTypes.string,
  // 'data-testid': PropTypes.string,
  // className: PropTypes.string,
  // children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  // disabled: PropTypes.bool,
  // type: PropTypes.oneOf(['submit']).isRequired,
  // htmlType: PropTypes.oneOf(['submit']),
  // loading: PropTypes.bool,
  // onClick: PropTypes.func
};

export default Button;

const Buttonn = styled.button`
  background-color: ${props => props.theme.buttons.actionButton};
  border-radius: ${props => props.theme.buttons.radius};
  border: none;
  color: ${props => props.theme.colors.text.primaryText};
  padding: 0.6rem 1rem;
  cursor: pointer;
`;
