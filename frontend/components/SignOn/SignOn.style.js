import styled from 'styled-components';
import { purpleLinkBtn, orangeLinkBtn } from '../../styles/button.style';

export const signOn = styled.div`
  grid-area: header-right;
  justify-self: end;
  margin-right: 10px;
  white-space: nowrap;

  @media screen and (min-width: 600px) {
    margin-right: 0;
  }
`;

export const purpleBtn = styled(purpleLinkBtn)``;

export const orangeBtn = styled(orangeLinkBtn)`
  margin-left: 10px;
`;
