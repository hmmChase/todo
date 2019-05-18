import styled from 'styled-components';

export const header = styled.header`
  grid-area: header;
  display: grid;
  grid-gap: 10px;

  background-color: ${props => props.theme.color.black};
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'header-left header-right';
  place-items: center center;
  padding: 10px 0 1px 0;

  @media screen and (min-width: 600px) {
    padding: 10px 20px 1px 20px;
  }
`;

export const h1 = styled.h1`
  font-size: 1.5rem;
  font-family: 'Play', sans-serif;
  color: ${props => props.theme.color.yellow_bright};
  margin: 0 0 0 65px;
  justify-self: start;
  letter-spacing: 0.05rem;

  @media screen and (min-width: 600px) {
    margin-left: 70px;
  }
`;
