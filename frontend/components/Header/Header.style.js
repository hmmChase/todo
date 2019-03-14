import styled from 'styled-components';

export const header = styled.header`
  display: grid;
  place-items: center;
  grid-template: 1fr / 1fr 1fr;
  h1 {
    color: ${props => props.theme.red};
  }
`;
