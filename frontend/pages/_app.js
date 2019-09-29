import App from 'next/app';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme.style';

export class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

// For FOUC issue, see _document.js
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('holderStyle').remove();
  });
}

export default MyApp;
