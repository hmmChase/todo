import styled from 'styled-components';

export const divLayout = styled.div`
  display: grid;
  max-width: 100vw;
  height: 100vh;
  grid-template-rows: 100px 50px 1fr 100px;
  /* grid-template-columns: 1fr minmax(350px, 1200px) 1fr; */
  grid-template-areas:
    'header header header'
    'nav nav nav'
    'main main main'
    'footer footer footer';

  header {
    grid-area: header;
  }

  nav {
    grid-area: nav;
  }

  main {
    grid-area: main;
  }

  footer {
    grid-area: footer;
  }

  header,
  nav,
  main,
  footer {
    /* grid-column-start: 2; */
    /* grid-column-end: span 1; */
  }
`;

export const main = styled.main`
  padding: 20px;
`;
