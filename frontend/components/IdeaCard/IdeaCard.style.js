import styled from 'styled-components';

export const li = styled.li`
  display: flex;
  margin: 20px;
  position: relative;
`;

export const deleteBtn = styled.button`
  background: none;
  background-image: url('/static/delete.svg');
  border: none;
  cursor: pointer;
  height: 20px;
  outline: none;
  position: absolute;
  right: -10px;
  top: -10px;
  width: 20px;

  &:active {
    height: 17px;
    right: -8px;
    top: -8px;
    width: 17px;
  }
`;

export const ideaInput = styled.input`
  outline: none;
  overflow-wrap: break-word;
  padding: 5px;
  width: 100%;
  word-break: break-all;
`;
