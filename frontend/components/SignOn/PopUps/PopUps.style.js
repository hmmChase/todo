import styled from 'styled-components';

export const divPopup = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const divOuter = styled.div`
  z-index: 666;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const divInner = styled.div`
  z-index: 999;
  padding: 10px;
  background-color: white;
`;
