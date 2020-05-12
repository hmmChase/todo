/* eslint-disable react-hooks/rules-of-hooks */

import { _StrictMode, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { devConLog } from '../utils/devCon';
import theme from '../public/styles/theme.style';

//! is this needed?
// import '../public/styles/empty.less';

const MyApp = (props) => {
  const { Component, pageProps } = props;

  devConLog(['----- _app -----']);

  if (process.env.NODE_ENV === 'development')
    useEffect(() => {
      const ReactDOM = require('react-dom');
      const ReactAxe = require('react-axe');

      // https://github.com/dequelabs/react-axe/issues/123
      const matches = (node) =>
        !(node.getAttribute('data-axe-reject') === 'true');

      ReactAxe(React, ReactDOM, 1000, {
        rules: [{ id: 'color-contrast', matches }],
      });
    }, []);

  return (
    // <StrictMode>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
    // </StrictMode>
  );
};

MyApp.propTypes = {
  Component: PropTypes.element.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// For FOUC issue, see _document.js
// https://github.com/ant-design/ant-design/issues/16037
// https://github.com/zeit/next.js/issues/8826
if (typeof window !== 'undefined')
  window.addEventListener('DOMContentLoaded', () =>
    document.getElementById('holderStyle').remove()
  );

export default MyApp;
