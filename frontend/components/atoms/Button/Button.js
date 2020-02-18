import PropTypes from 'prop-types';
import * as sc from './Button.style';

const Button = props => (
  <sc.AntButton
    aria-busy={props.ariaBusy}
    aria-label={props.ariaLabel}
    disabled={props.disabled}
    htmlType={props.htmlType}
    onClick={props.onClick}
    type={props.type}
  >
    {props.children}
  </sc.AntButton>
);

Button.propTypes = {
  ariaBusy: PropTypes.bool,
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  htmlType: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired
};

export default React.memo(Button);
