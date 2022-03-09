import { createGlobalStyle } from 'styled-components';

import normalize from './normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

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

  html, body {
    height: 100%;
  }

  #__next {
    min-height: 100%;
  }

  h1 {
    font-family: ${props => props.theme.fonts.title};
  }

  body {
    background: ${props => props.theme.background.primary};
    color: ${props => props.theme.text.primary};
    font-size: ${props => props.theme.fontSize.primary};
  }

  *, ::before, ::after {
    font-family: ${props => props.theme.fonts.body};
  }
`;

export default GlobalStyle;
