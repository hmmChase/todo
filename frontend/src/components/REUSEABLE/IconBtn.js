import PropTypes from 'prop-types';
import styled from 'styled-components';

import X from '../DESIGN/icons/X';
import Expand from '../DESIGN/icons/Expand';

export const ExpandIconBtn = props => (
  <Button aria-label={props['aria-label']} data-testid={props['data-testid']}>
    <Expand />
  </Button>
);

export const XIconBtn = props => (
  <Button
    aria-label={props['aria-label']}
    data-testid={props['data-testid']}
    onClick={props.onClick}
  >
    <X />
  </Button>
);

ExpandIconBtn.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string
};

XIconBtn.propTypes = {
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  onClick: PropTypes.func.isRequired
};

const Button = styled.button`
  border: 1px solid rgb(117, 117, 117);
  height: 20px;
  width: 20px;
  cursor: pointer;
  padding: 0;
  background-color: rgb(235, 245, 255);

  :hover {
    background-color: #c8dcf0;
  }

  :active {
    padding: 1px;
  }

  > svg {
    fill: #1890ff;
    margin: 3px;
  }
`;
