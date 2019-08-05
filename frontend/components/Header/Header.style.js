import styled from 'styled-components';

export const header = styled.header`
  background-color: ${props => props.theme.color.black};
  display: grid;
  grid-area: header;
  grid-gap: 10px;
  grid-template-areas: 'header-left header-right';
  grid-template-columns: 1fr 1fr;
  padding: 10px 0 1px 0;
  place-items: center center;

  @media screen and (min-width: 600px) {
    padding: 10px 20px 1px 20px;
  }
`;

export const h1 = styled.h1`
  color: ${props => props.theme.color.yellow_bright};
  font-family: 'Play', sans-serif;
  font-size: 1.5rem;
  justify-self: start;
  letter-spacing: 0.05rem;
  margin: 0 0 0 65px;

  @media screen and (min-width: 600px) {
    margin-left: 70px;
  }
`;
