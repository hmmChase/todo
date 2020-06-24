import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
// import theme from './theme.style';

export default createGlobalStyle`
  ${styledNormalize}

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    font-display: fallback;
    src: url('/fonts/open-sans-v15-latin-regular.woff2') format('woff2'),
         url('/fonts/open-sans-v15-latin-regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Play';
    font-style: normal;
    font-weight: normal;
    font-display: fallback;
    src: url('/fonts/play-v10-latin-regular.woff2') format('woff2'),
         url('/fonts/play-v10-latin-regular.woff') format('woff');
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
    font-family: 'Open Sans', sans-serif;

    ${'' /* color: ${theme.color.text}; */}
  }

  body {
    margin: 0;
    padding: 0;
  }
`;
