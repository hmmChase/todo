import { FC } from 'react';
import styled from 'styled-components';

import Expand from '../DESIGN/icons/Expand';
import X from '../DESIGN/icons/X';

interface ExpandIconBtnProps {
  'aria-label'?: string;
  'data-testid'?: string;
}

export const ExpandIconBtn: FC<ExpandIconBtnProps> = props => (
  <Button aria-label={props['aria-label']} data-testid={props['data-testid']}>
    <Expand />
  </Button>
);

interface XIconBtnProps {
  'aria-label'?: string;
  'data-testid'?: string;
  onClick: Function;
}

export const XIconBtn: FC<XIconBtnProps> = props => {
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
