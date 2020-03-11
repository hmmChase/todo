import React from 'react';
import PropTypes from 'prop-types';
import * as sc from './HeaderTitle.style';

const HeaderTitle = props => (
  <sc.Title className={props.className}>{props.children}</sc.Title>
);

HeaderTitle.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default React.memo(HeaderTitle);
