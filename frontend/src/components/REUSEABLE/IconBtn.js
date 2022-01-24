import PropTypes from 'prop-types';
import styled from 'styled-components';

import Expand from '../DESIGN/icons/Expand';
import X from '../DESIGN/icons/X';

export const ExpandIconBtn = props => (
  <Button aria-label={props['aria-label']} data-testid={props['data-testid']}>
    <Expand />
  </Button>
);

export const XIconBtn = props => {
  const { onClick } = props;

  return (
    <Button
      aria-label={props['aria-label']}
      data-testid={props['data-testid']}
      onClick={onClick}
    >
      <X />
    </Button>
  );
};

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
  background-color: ${props => props.theme.background.tertiary};
  border-radius: ${props => props.theme.borderRadius.primary};
  border: 1px solid ${props => props.theme.border.secondary};
  cursor: pointer;
  height: 22px;
  padding: 2px;
  vertical-align: middle;
  width: 22px;

  :hover {
    padding: 1px;
  }

  :active {
    padding: 2px;
  }

  > svg {
    fill: ${props => props.theme.fill.secondary};
    margin: 2px;
  }
`;
