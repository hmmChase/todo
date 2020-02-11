import React from 'react';
import PropTypes from 'prop-types';

import * as sc from './IconBtn.style';

const IconBtn = props => (
  <sc.AntIcon type={props.type} theme='twoTone' onClick={props.onClick} />
);

// test2

IconBtn.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default React.memo(IconBtn);
