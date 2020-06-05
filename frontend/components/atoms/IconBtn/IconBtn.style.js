import styled from 'styled-components';

export const Button = styled.button`
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

  svg {
    fill: #1890ff;
    margin: 3px;
  }
`;
