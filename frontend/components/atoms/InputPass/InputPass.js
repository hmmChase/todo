import PropTypes from 'prop-types';
import { Input } from 'antd';

const InputPass = (props) => (
  <Input.Password
    className={props.className}
    id={props.id}
    name={props.name}
    value={props.value}
    onChange={props.onChange}
    onBlur={props.onBlur}
    // onPressEnter={props.onPressEnter}
    visibilityToggle={true}
  />
);

InputPass.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  // onPressEnter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default React.memo(InputPass);
