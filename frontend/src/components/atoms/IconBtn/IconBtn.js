import PropTypes from 'prop-types';
import Expand from '../../design/icons/Expand/Expand';
import X from '../../design/icons/X/X';
import * as sc from './IconBtn.style';

export const ExpandIconBtn = props => (
  <sc.Button
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
    className={props.className}
  >
    <Expand />
  </sc.Button>
);

export const XIconBtn = props => (
  <sc.Button
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
    className={props.className}
    onClick={props.onClick}
  >
    <X />
  </sc.Button>
);

ExpandIconBtn.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string
};

XIconBtn.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
