import React from 'react';
import PropTypes from 'prop-types';
import * as sc from './IconBtn.style';

const IconBtn = props => (
  <sc.AntIcon
    className={props.className}
    type={props.type}
    theme='twoTone'
    onClick={props.onClick}
  />
);

IconBtn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default React.memo(IconBtn);
