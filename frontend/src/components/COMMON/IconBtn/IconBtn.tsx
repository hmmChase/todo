import styled from 'styled-components';
import type { MouseEventHandler } from 'react';

import Expand from '@/components/ICONS/Expand/Expand';
import X from '@/components/ICONS/X/X';

interface ExpandIconBtnProps {
  name: string;
}

export const ExpandIconBtn = ({ name }: ExpandIconBtnProps) => (
  <Button aria-label={name} data-testid={name}>
    <Expand />
  </Button>
);

interface XIconBtnProps {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const XIconBtn = ({ name, onClick }: XIconBtnProps) => (
  <Button aria-label={name} data-testid={name} onClick={onClick}>
    <X />
  </Button>
);

const Button = styled.button`
  background-color: ${props => props.theme.background.tertiary};
  border-radius: ${props => props.theme.borderRadius.primary};
  border: 1px solid ${props => props.theme.border.secondary};
  cursor: pointer;
  height: 22px;
  padding: 2px;
  vertical-align: middle;
  width: 22px;

  :active {
    padding: 2px;
  }

  :hover {
    padding: 1px;
  }

  > svg {
    fill: ${props => props.theme.fill.secondary};
    margin: 2px;
  }
`;
