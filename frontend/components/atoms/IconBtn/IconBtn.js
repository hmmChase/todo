import React from 'react';
import PropTypes from 'prop-types';
import Expand from '../../design/Icons/Expand/Expand';
import Left from '../../design/Icons/Left/Left';
import X from '../../design/Icons/X/X';
import * as sc from './IconBtn.style';

export const ExpandIconBtn = props => (
  <sc.Button aria-label={props.ariaLabel} className={props.className}>
    <Expand />
  </sc.Button>
);

export const LeftIconBtn = props => (
  <sc.Button aria-label={props.ariaLabel} className={props.className}>
    <Left />
  </sc.Button>
);

export const XIconBtn = props => (
  <sc.Button aria-label={props.ariaLabel} className={props.className}>
    <X />
  </sc.Button>
);

ExpandIconBtn.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string
};

LeftIconBtn.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string
};

XIconBtn.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string
};
