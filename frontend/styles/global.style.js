import { createGlobalStyle } from 'styled-components';
import theme from './theme.style';

export default createGlobalStyle`
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
