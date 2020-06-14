import PropTypes from 'prop-types';
import * as sc from './Button.style';

const Button = (props) => (
  <sc.Buttonn
    aria-label={props['aria-label']}
    className={props.className}
    disabled={props.disabled}
    htmlType={props.htmlType}
    loading={props.loading}
    onClick={props.onClick}
    type={props.type}
  >
    {props.children}
  </sc.Buttonn>
);

Button.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
  htmlType: PropTypes.oneOf(['submit']),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['default', 'primary', 'dashed', 'link']).isRequired,
};

export default React.memo(Button);
