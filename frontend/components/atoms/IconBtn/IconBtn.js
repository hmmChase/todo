import PropTypes from 'prop-types';
import Expand from '../../design/icons/Expand/Expand';
import X from '../../design/icons/X/X';
import * as sc from './IconBtn.style';

export const ExpandIconBtn = (props) => (
  <sc.Button className={props.className}>
    <Expand />
  </sc.Button>
);

export const XIconBtn = (props) => (
  <sc.Button className={props.className} onClick={props.onClick}>
    <X />
  </sc.Button>
);

ExpandIconBtn.propTypes = {
  className: PropTypes.string,
};

XIconBtn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
