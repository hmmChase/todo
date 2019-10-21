/* eslint-disable operator-linebreak */
/* eslint-disable no-multi-assign */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';

import { initApolloClient } from './initApolloClient';
import { getAccessToken, setAccessToken } from '../utils/authenticate';

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */

export function withApollo(PageComponent, { ssr = true } = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '----------start withApollo----------',
      new Date().getMilliseconds()
    );
  }

  // WithApollo HOC
  const WithApollo = ({
    // Destructure props provided by WithApollo.getInitialProps
    apolloClient,
    apolloState,
    headers,
    serverAccessToken,
    ...pageProps
  }) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '----------start withApollo HOC----------',
        new Date().getMilliseconds()
      );
    }

    // ----------Access/Refresh token code----------

    // Server-side, if access token is undefined, set it
    if (typeof window === 'undefined' && !getAccessToken()) {
      setAccessToken(serverAccessToken);
    }

    // ---------------------------------------------

    // If apolloClient doesn't exist, create it
    const client =
      apolloClient || initApolloClient(apolloState, headers, serverAccessToken);

    if (process.env.NODE_ENV === 'development') {
      console.log(
        '----------end withApollo HOC----------',
        new Date().getMilliseconds()
      );
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // For Development
  // Set the correct displayName in development
  if (process.env.NODE_ENV === 'development') {
    // Find correct display name
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    // Warn if old way of installing apollo is used
    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`;

    // Add some prop types
    WithApollo.propTypes = {
      // Used for getDataFromTree rendering
      apolloClient: PropTypes.object,
      // Used for client/server rendering
      apolloState: PropTypes.object,
      headers: PropTypes.object,
      serverAccessToken: PropTypes.string
    };
  }

  // Retrieve data server-side
  if (ssr || PageComponent.getInitialProps) {
    // Code exectution starts here
    WithApollo.getInitialProps = async ctx => {
      const { req, res, AppTree } = ctx;
      const headers = req ? req.headers : {};

      if (process.env.NODE_ENV === 'development') {
        console.log(
          '----------start withApollo GIP----------',
          new Date().getMilliseconds()
        );
      }

      // ----------Access/Refresh token code----------

      // Declare auth tokens
      let serverAccessToken = '';
      let refreshToken = '';

      if (typeof window === 'undefined') {
        // Get refresh token
        if (req && req.headers && req.headers.cookie) {
          refreshToken = req.headers.cookie.replace('rt=', '');
        }

        // If theres a refresh token (user logged in), fetch an access token
        if (refreshToken) {
          const url =
            process.env.NODE_ENV === 'development'
              ? process.env.DEV_REFRESH_URL
              : process.env.PROD_REFRESH_URL;

          try {
            const response = await fetch(url, {
              method: 'POST',
              credentials: 'include',
              headers: { cookie: `rt=${refreshToken}` }
            });

            const data = await response.json();

            serverAccessToken = data.accessToken;

            console.log('TCL: data.accessToken', data.accessToken);
          } catch (err) {
            if (process.env.NODE_ENV === 'development') {
              console.log('WithApollo refresh fetch error: ', err);
            }
          }
        }
      }

      // ---------------------------------------------

      // Initialize ApolloClient
      // Add it to the ctx object
      // so it's available in `PageComponent.getInitialProps`.

      const apolloClient = (ctx.apolloClient = initApolloClient(
        // This is empty initialState object
        {},
        // After the auth tokens are fetched
        // Pass them to the apollo client
        headers,
        serverAccessToken
      ));

      // Run all GraphQL queries in the component tree
      // and extract the resulting data

      // If a page has a getInitialProps, call it
      // pageProps is now equal to the data returned server-side
      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
          // return {};
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // On initial page load, while on the server and inside
            // getInitialProps, we invoke the Apollo method, getDataFromTree.

            // This method returns a promise; at the point in which the promise
            // resolves, our Apollo Client store is completely initialized.
            const { getDataFromTree } = await import('@apollo/react-ssr');

            // Run all GraphQL queries
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
                // apolloClient={apolloClient}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            if (process.env.NODE_ENV === 'development') {
              console.error('GraphQL error occurred [getDataFromTree]', error);
            }
          }
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      // To avoid calling initApollo() twice in the server we send the Apollo Client as a prop
      // to the component, otherwise the component would have to call initApollo() again but this
      // time without the context, once that happens the following code will make sure we send
      // the prop as `null` to the browser
      // apolloClient.toJSON = () => null;

      if (process.env.NODE_ENV === 'development') {
        console.log(
          '----------end withApollo GIP----------',
          new Date().getMilliseconds()
        );
      }

      // Send data to WithApollo HOC
      return {
        ...pageProps,
        // apolloClient,
        apolloState,
        headers,
        serverAccessToken
      };
    };
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '----------end withApollo----------',
      new Date().getMilliseconds()
    );
  }

  return WithApollo;
}
