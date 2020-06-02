import PropTypes from 'prop-types';
import { Alert } from 'antd';

const AlertMsg = (props) => (
  <Alert
    className={props.className}
    message={props.message}
    type={props.type}
    showIcon
  />
);

AlertMsg.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default React.memo(AlertMsg);
