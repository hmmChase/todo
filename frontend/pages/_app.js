import { StrictMode } from 'react';
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
    <StrictMode>
      <Component {...pageProps} />
    </StrictMode>
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

export default MyApp;
