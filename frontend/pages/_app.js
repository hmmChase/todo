import { _StrictMode } from 'react';
import PropTypes from 'prop-types';
import '../public/Index.css';

const MyApp = (props) => {
  const { Component, pageProps } = props;

  console.log('_app render', new Date().getMilliseconds());

  //     // console.log('_app props: ', Object.keys(this.props));
  //     // console.log('_app props.apolloState: ', this.props.apolloState);
  //     // const cache = this.props.apollo.cache.extract();
  //     // console.log('apollo cache: ', cache);
  //     // pageProps includes data returned from getInitialProps

  return (
    // <StrictMode>
    <Component {...pageProps} />
    // </StrictMode>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

// For FOUC issue, see _document.js
// https://github.com/ant-design/ant-design/issues/16037
// https://github.com/vercel/next.js/issues/8826
if (typeof window !== 'undefined')
  window.addEventListener('DOMContentLoaded', () =>
    document.getElementById('holderStyle').remove()
  );

export default MyApp;
