import PropTypes from 'prop-types';
import { Input as Inputt } from 'antd';

const Input = (props) => (
  <Inputt
    className={props.className}
    id={props.id}
    name={props.name}
    value={props.value}
    onChange={props.onChange}
    onBlur={props.onBlur}
    // onPressEnter={props.onPressEnter}
  />
);

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  // onPressEnter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default React.memo(Input);
