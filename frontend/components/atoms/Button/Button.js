import PropTypes from 'prop-types';
import * as sc from './Button.style';

const Button = props => (
  <sc.AntButton
    aria-busy={props.ariaBusy}
    aria-label={props.ariaLabel}
    disabled={props.disabled}
    htmlType={props.htmlType}
    loading={props.loading}
    onClick={props.onClick}
    type={props.type}
  >
    {props.children}
  </sc.AntButton>
);

Button.propTypes = {
  ariaBusy: PropTypes.bool,
  ariaLabel: PropTypes.string,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  htmlType: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default React.memo(Button);
