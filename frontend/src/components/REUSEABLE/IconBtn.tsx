import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';

import Expand from '../DESIGN/icons/Expand';
import X from '../DESIGN/icons/X';

interface ExpandIconBtnProps {
  name: string;
}

export const ExpandIconBtn: FC<ExpandIconBtnProps> = ({ name }) => (
  <Button aria-label={name} data-testid={name}>
    <Expand />
  </Button>
);

interface XIconBtnProps {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const XIconBtn: FC<XIconBtnProps> = ({ name, onClick }) => (
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
