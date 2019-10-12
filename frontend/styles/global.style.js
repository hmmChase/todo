import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

import theme from './theme.style';

export default createGlobalStyle`
  ${styledNormalize}

  @font-face {
    font-display: fallback;
    /* font-display: swap; */
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    src: url('/static/fonts/open-sans-v15-latin-regular.woff2') format('woff2'),
         url('/static/fonts/open-sans-v15-latin-regular.woff') format('woff');
  }

  @font-face {
    font-display: fallback;
    /* font-display: swap; */
    font-family: 'Play';
    font-style: normal;
    font-weight: normal;
    src: url('/static/fonts/play-v10-latin-regular.woff2') format('woff2'),
         url('/static/fonts/play-v10-latin-regular.woff') format('woff');
  }

  html {
    box-sizing: border-box;
    overflow-x: hidden;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;
