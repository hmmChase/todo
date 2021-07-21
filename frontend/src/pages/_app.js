// https://nextjs.org/docs/advanced-features/custom-app
// https://github.com/vercel/next.js/tree/master/examples/with-styled-components

import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

import { useApollo } from '../graphql/apolloClient';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { siteTitle } from '../config';

const MyApp = props => {
  const { Component, pageProps } = props;

  const apolloClient = useApollo(pageProps);

  /**
   * Render our app
   * - We wrap the whole app with ApolloProvider, so any component in the app can
   *    make GraphqL requests. Our provider needs the client we created above,
   *    so we pass it as a prop
   *
   * - We need a router, so we can navigate the app. We're using Reach router for this.
   *    The router chooses between which component to render, depending on the url path.
   *    ex: localhost:3000/login will render only the `Login` component
   */

  return (
    <>
      <Head>
        <title>{siteTitle}</title>

        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <GlobalStyle />

      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;
