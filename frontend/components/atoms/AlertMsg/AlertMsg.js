import React from 'react';
import PropTypes from 'prop-types';
import * as sc from './AlertMsg.style';

const AlertMsg = props => (
  <sc.AntAlert message={props.message} type={props.type} showIcon />
);

AlertMsg.propTypes = { message: PropTypes.any, type: PropTypes.any };

export default React.memo(AlertMsg);
