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

  // Use the layout defined at the page level, if available
  // https://github.com/vercel/next.js/tree/canary/examples/layout-component
  const getLayout = Component.getLayout || (page => page);

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
          {getLayout(<Component {...pageProps} />)}
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
