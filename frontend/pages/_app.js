/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme.style';
// import '../public/styles/empty.less';

const MyApp = props => {
  const { Component, pageProps } = props;

  if (process.env.NODE_ENV === 'development')
    useEffect(() => {
      const ReactDOM = require('react-dom');
      const ReactAxe = require('react-axe');

      // https://github.com/dequelabs/react-axe/issues/123
      const matches = node =>
        !(node.getAttribute('data-axe-reject') === 'true');

      ReactAxe(React, ReactDOM, 1000, {
        rules: [{ id: 'color-contrast', matches }]
      });
    }, []);

  if (process.env.NODE_ENV === 'development')
    console.log(
      '----------_app render----------',
      new Date().getMilliseconds()
    );

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

// For FOUC issue, see _document.js
// https://github.com/ant-design/ant-design/issues/16037
// https://github.com/zeit/next.js/issues/8826
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('holderStyle').remove();
  });
}

export default MyApp;
