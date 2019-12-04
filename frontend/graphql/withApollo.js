/* eslint-disable require-atomic-updates */

import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import {
  fetchAccessToken,
  getAccessToken,
  setAccessToken
} from '../utils/accessToken';
import initApollo from './initApollo';

const isServer = () => typeof window === 'undefined';

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */

// withApollo first fetches queries and hydrates the store server-side
// then passes the data to pages through HOC

const withApollo = (PageComponent, { ssr = true } = {}) => {
  if (process.env.NODE_ENV === 'development')
    console.log(
      '----------start withApollo----------',
      new Date().getMilliseconds()
    );

  // WithApollo HOC
  const WithApollo = ({
    // Destructure props provided by WithApollo.getInitialProps
    apolloClient,
    apolloState,
    serverAccessToken,
    ...pageProps
  }) => {
    if (process.env.NODE_ENV === 'development')
      console.log(
        '----------start withApollo HOC----------',
        new Date().getMilliseconds()
      );

    // ----------Access/Refresh token code----------

    // Client-side, if no Access token set,
    // set Access token with Access token returned from GIP
    if (!isServer() && !getAccessToken() && serverAccessToken)
      setAccessToken(serverAccessToken);

    // ---------------------------------------------

    // If apolloClient doesn't exist, create it
    const client = apolloClient || initApollo(apolloState);

    if (process.env.NODE_ENV === 'development')
      console.log(
        '----------end withApollo HOC----------',
        new Date().getMilliseconds()
      );

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // For Development
  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    // Find correct display name
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    // Warn if old way of installing apollo is used
    if (displayName === 'App')
      console.warn('This withApollo HOC only works with PageComponents.');

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`;

    // Add prop types
    WithApollo.propTypes = {
      // Used for getDataFromTree rendering
      apolloClient: PropTypes.object,
      // Used for client/server rendering
      apolloState: PropTypes.object,
      serverAccessToken: PropTypes.string
    };
  }

  // Code execution starts here
  if (ssr || PageComponent.getInitialProps) {
    // Retrieve data server-side
    WithApollo.getInitialProps = async ctx => {
      const { req, res, AppTree } = ctx;

      if (process.env.NODE_ENV === 'development')
        console.log(
          '----------start withApollo GIP----------',
          new Date().getMilliseconds()
        );

      // ----------Access/Refresh token code----------

      // On first load or refresh, if a Refresh token exists,
      // attempt to fetch an Access token and store as a global variable

      let serverAccessToken = '';

      if (req && req.headers && req.headers.cookie)
        serverAccessToken = await fetchAccessToken(req.headers.cookie);

      // ---------------------------------------------

      // Initialize ApolloClient and add it to the ctx object,
      // so it's available in `PageComponent.getInitialProps`.

      // Pass an empty initialState object to initApollo
      const apolloClient = (ctx.apolloClient = initApollo({}));

      // Run all GraphQL queries in the component tree,
      // and extract the resulting data.
      // If a page has a getInitialProps, call it.
      // pageProps is now equal to the data returned server-side
      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      // Only on the server
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res && (res.headersSent || res.finished)) return pageProps;

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
                pageProps={{ ...pageProps, apolloClient }}
                apolloClient={apolloClient}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            if (process.env.NODE_ENV === 'development')
              console.error('GraphQL error occurred [getDataFromTree]', error);
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

      if (process.env.NODE_ENV === 'development')
        console.log(
          '----------end withApollo GIP----------',
          new Date().getMilliseconds()
        );

      // Send data to WithApollo HOC
      return { ...pageProps, apolloState, serverAccessToken };
    };
  }

  if (process.env.NODE_ENV === 'development')
    console.log(
      '----------end withApollo----------',
      new Date().getMilliseconds()
    );

  return WithApollo;
};

export default withApollo;
