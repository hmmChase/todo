import styled from 'styled-components';
import { purpleBtn, orangeBtn } from '../../styles/button.style';

export { purpleBtn, orangeBtn };

export const div = styled.div``;

export const divPopup = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const divOuter = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const divInner = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
`;
