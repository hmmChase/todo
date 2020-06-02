import PropTypes from 'prop-types';
import * as sc from './Button.style';

const Button = (props) => (
  <sc.Buttonn
    className={props.className}
    // disabled={props.disabled}
    // htmlType={props.htmlType}
    loading={props.loading}
    onClick={props.onClick}
    type={props.type}
  >
    {props.children}
  </sc.Buttonn>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  // disabled: PropTypes.bool.isRequired,
  // htmlType: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default React.memo(Button);
