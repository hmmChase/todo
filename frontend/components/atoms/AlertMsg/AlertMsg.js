import PropTypes from 'prop-types';
import { Alert } from 'antd';

const AlertMsg = (props) => (
  <Alert
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
    className={props.className}
    message={props.message}
    type={props.type}
    showIcon
  />
);

AlertMsg.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default React.memo(AlertMsg);
