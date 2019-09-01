import styled from 'styled-components';

export const li = styled.li`
  display: flex;
  margin: 20px;
  position: relative;
`;

export const detailBtn = styled.button`
  background: none;
  background-image: url('/static/detail.svg');
  border: none;
  cursor: pointer;
  height: 16px;
  outline: none;
  position: absolute;
  right: 20px;
  top: -8px;
  width: 16px;

  &:active {
    height: 17px;
    right: -8px;
    top: -8px;
    width: 17px;
  }
`;

export const deleteBtn = styled.button`
  background: none;
  background-image: url('/static/delete.svg');
  border: none;
  border-radius: 50%;

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

  &:hover {
    border: 1px solid black;
  }
`;

export const ideaInput = styled.input`
  outline: none;
  overflow-wrap: break-word;
  padding: 5px;
  width: 100%;
  word-break: break-all;
`;
