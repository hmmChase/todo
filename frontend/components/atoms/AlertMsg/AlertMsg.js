import React from 'react';
import PropTypes from 'prop-types';
import * as sc from './AlertMsg.style';

const AlertMsg = props => (
  <sc.AntAlert
    className={props.className}
    message={props.message}
    type={props.type}
    showIcon
  />
);

AlertMsg.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default React.memo(AlertMsg);
