import React from 'react';
import PropTypes from 'prop-types';

import * as sc from './Icon.style';

const Icon = props => (
  <sc.AntIcon type={props.type} theme='twoTone' onClick={props.onClick} />
);

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default React.memo(Icon);
