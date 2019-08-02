import styled from 'styled-components';

export const divLayout = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'main';
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;

  @media screen and (min-width: 900px) {
    grid-template-areas:
      'header-margin-left header header-margin-right'
      '. main .';
    grid-template-columns: 1fr 900px 1fr;
  }
`;

export const headerMargin = styled.div`
  background-color: ${props => props.theme.color.black};
  display: none;

  @media screen and (min-width: 900px) {
    display: block;
  }
`;

export const headerMarginLeft = styled(headerMargin)`
  grid-area: header-margin-left;
`;

export const headerMarginRight = styled(headerMargin)`
  grid-area: header-margin-right;
`;

export const mainContainer = styled.main`
  /* display: flex; */
  /* flex-direction: column; */
  /* flex-grow: 1; */
  grid-area: main;
  /* max-width: 600; */
  /* margin: 0 auto; */
  /* width: 100%; */
`;
