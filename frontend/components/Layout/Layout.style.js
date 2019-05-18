import styled from 'styled-components';

export const divLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header'
    'main';

  @media screen and (min-width: 900px) {
    grid-template-columns: 1fr 900px 1fr;
    grid-template-areas:
      'header-margin-left header header-margin-right'
      '. main .';
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
