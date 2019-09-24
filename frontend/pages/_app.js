/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import withApollo from '../graphql/withApollo';
import theme from '../styles/theme.style';

export class MyApp extends App {
  render() {
    console.log('_app render', new Date().getMilliseconds());

    // console.log('_app props: ', Object.keys(this.props));
    // console.log('_app props.apolloState: ', this.props.apolloState);

    // const cache = this.props.apollo.cache.extract();
    // console.log('apollo cache: ', cache);

    // pageProps includes data returned from getInitialProps

    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

// For FOUC issue, see _document.js
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('holderStyle').remove();
  });
}

export default withApollo(MyApp);
