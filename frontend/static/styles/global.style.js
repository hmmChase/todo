import { createGlobalStyle } from 'styled-components';
import theme from './theme.style';

export default createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    src:  url('/static/fonts/open-sans-v15-latin-regular.woff2') format('woff2'),
          url('/static/fonts/open-sans-v15-latin-regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    color: ${theme.black};
    font-family: 'Open Sans';
  }

  a {
    text-decoration: none;
  }
`;
