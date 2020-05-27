import React from 'react';
import PropTypes from 'prop-types';
import Expand from '../../design/icons/Expand/Expand';
import Left from '../../design/icons/Left/Left';
import X from '../../design/icons/X/X';
import * as sc from './IconBtn.style';

export const ExpandIconBtn = (props) => (
  <sc.Button
    aria-label={props.ariaLabel}
    className={props.className}
    onClick={props.onClick}
  >
    <Expand />
  </sc.Button>
);

export const LeftIconBtn = (props) => (
  <sc.Button
    aria-label={props.ariaLabel}
    className={props.className}
    onClick={props.onClick}
  >
    <Left />
  </sc.Button>
);

export const XIconBtn = (props) => (
  <sc.Button
    aria-label={props.ariaLabel}
    className={props.className}
    onClick={props.onClick}
  >
    <X />
  </sc.Button>
);

ExpandIconBtn.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

LeftIconBtn.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

XIconBtn.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
