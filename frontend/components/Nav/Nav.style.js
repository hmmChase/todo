import styled from 'styled-components';

export const ul = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
  flex-wrap: wrap;
`;

export const li = styled.li`
  flex: 3;
  flex: 1 1 50%;

  @media all and (max-width: 500px) {
    flex-basis: 100%;
  }
`;

export const a = styled.a`
  color: white;
  letter-spacing: 1px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
  cursor: pointer;

  :hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;
