import styled from 'styled-components';

export const li = styled.li`
  display: flex;
  position: relative;
  margin: 20px;
`;

export const deleteBtn = styled.button`
  background: none;
  background-image: url('/static/delete.svg');
  position: absolute;
  right: -10px;
  top: -10px;
  height: 20px;
  width: 20px;
  border: none;
  outline: none;
  cursor: pointer;

  &:active {
    right: -8px;
    top: -8px;
    height: 17px;
    width: 17px;
  }
`;

export const ideaInput = styled.input`
  width: 100%;
  outline: none;
  padding: 5px;
  overflow-wrap: break-word;
  word-break: break-all;
`;
