import styled from 'styled-components';

export const ErrorList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ErrorItem = styled.li`
  :not(:first-child) {
    margin-top: 10px;
  }
`;
