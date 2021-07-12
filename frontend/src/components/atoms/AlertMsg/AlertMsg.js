import PropTypes from 'prop-types';

const AlertMsg = props => (
  <div
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
    className={props.className}
    type={props.type}
    showIcon
  >
    {props.message}
  </div>
);

AlertMsg.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default React.memo(AlertMsg);
