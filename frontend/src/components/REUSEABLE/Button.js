import PropTypes from 'prop-types';
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
  // htmlType: PropTypes.oneOf(['submit']),
  // loading: PropTypes.bool,
  // onClick: PropTypes.func,
  // type: PropTypes.oneOf(['default', 'primary', 'dashed', 'link']).isRequired
};

export default Button;

/** styled components */

export const Buttonn = styled.button`
  background-color: ${props => props.theme.colors.buttons.actionButton};
  border-radius: 4px;
  border: none;
  color: ${props => props.theme.colors.text.primaryText};
  padding: 0.6rem 1rem;
  cursor: pointer;
`;
