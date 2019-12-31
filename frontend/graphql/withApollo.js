import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import jwt from 'jsonwebtoken';
import initApollo from './initApollo';
import {
  fetchAccessToken,
  getAccessToken,
  setAccessToken
} from '../utils/accessToken';
import { devConLog, devConErr } from '../utils/devLog';
import { refreshTokenSecret } from '../constants';

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
  devConLog(['----- start withApollo -----']);

  // WithApollo HOC
  const WithApollo = ({
    // Destructure props provided by WithApollo.getInitialProps
    apolloClient,
    apolloState,
    serverAccessToken,
    ...pageProps
  }) => {
    devConLog(['----- start withApollo HOC -----']);

    // ----- Access/Refresh token code -----

    // Client-side, if no Access token set,
    // set Access token with Access token returned from GIP
    if (!isServer() && !getAccessToken() && serverAccessToken)
      setAccessToken(serverAccessToken);

    // -------------------------------------

    // If apolloClient doesn't exist, create it
    const client = apolloClient || initApollo(apolloState);

    devConLog(['----- end withApollo HOC -----']);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV === 'development') {
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
    WithApollo.getInitialProps = async ctx => {
      const { req, res, AppTree } = ctx;

      devConLog(['----- start withApollo GIP -----']);

      // ----- Access/Refresh token code -----

      // On initial page load (server-side), if a Refresh token exists,
      // verify it, then attempt to fetch an Access token and store as a
      // global variable

      let serverAccessToken = '';

      // Check for cookie header
      if (req && req.headers && req.headers.cookie) {
        // Parse Refresh token
        const refreshToken = req.headers.cookie.replace('rt=', '');

        // If Refresh token available
        if (refreshToken) {
          // Verify Refresh token
          try {
            jwt.verify(refreshToken, refreshTokenSecret);

            // Fetch Access token
            serverAccessToken = await fetchAccessToken(refreshToken);

            // Set Access Token
            // setAccessToken(accessToken);
          } catch (error) {
            devConErr(['WithApollo Refresh token verify error: ', error]);
          }
        }
      }

      // -------------------------------------

      // Initialize ApolloClient and add it to the ctx object,
      // so it's available in `PageComponent.getInitialProps`.

      // Pass an empty initialState object to initApollo
      const apolloClient = (ctx.apolloClient = initApollo(
        {},
        serverAccessToken
      ));

      // Run all GraphQL queries in the component tree,
      // and extract the resulting data.
      // If a page has a getInitialProps, call it.
      // pageProps is now equal to the data returned server-side
      let pageProps = {};

      if (PageComponent.getInitialProps)
        pageProps = await PageComponent.getInitialProps(ctx);

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
              <AppTree pageProps={{ ...pageProps, apolloClient }} />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            devConErr(['GraphQL error occurred [getDataFromTree]', error]);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      // To avoid calling initApollo() twice in the server we send the
      // Apollo Client as a prop to the component, otherwise the component
      // would have to call initApollo() again but this time without the
      // context, once that happens the following code will make sure we send
      // the prop as `null` to the browser
      // apolloClient.toJSON = () => null;

      devConLog(['----- end withApollo GIP -----']);

      // Send data to WithApollo HOC
      return { ...pageProps, apolloState, serverAccessToken };
    };
  }

  devConLog(['----- end withApollo -----']);

  return WithApollo;
};

export default withApollo;
