import styled from 'styled-components';

export const header = styled.header`
  display: grid;
  place-items: center;
  grid-template: 1fr / 1fr 1fr;

  h1 {
    font-size: 1rem;
    color: ${props => props.theme.color.red};
  }
`;
