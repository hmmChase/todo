import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloProvider } from '@apollo/client';
import jwt from 'jsonwebtoken';
import createApollo from './createApollo';
import { fetchAccessToken } from '../utils/accessToken';
import { devConLog, devConWarn, devConErr } from '../utils/devCon';

/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */

// called on initial page load, server-side
// called on page change, client-side
const initOnContext = (ctx, accessToken, refreshToken) => {
  // const accessToken = accessToken || getAccessToken();

  const inAppContext = Boolean(ctx.ctx);

  // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === 'development')
    if (inAppContext)
      devConWarn([
        'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' +
          'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n',
      ]);

  // Initialize Apollo Client if not already done
  // !ctx.apolloClient is always undefined
  const apolloClient =
    ctx.apolloClient ||
    initApollo(
      ctx.apolloState || {},
      inAppContext ? ctx.ctx : ctx,
      accessToken,
      refreshToken
    );

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;

  if (inAppContext) ctx.ctx.apolloClient = apolloClient;

  return ctx;
};

// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */

// called on inital page load, both client and server side
// called on page change, client-side
const initApollo = (initialState, ctx, accessToken, refreshToken) => {
  // Make sure to create a new  for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined')
    return createApollo(initialState, ctx, accessToken, refreshToken);

  // Reuse client on the client-side
  if (!globalApolloClient)
    globalApolloClient = createApollo(
      initialState,
      ctx,
      accessToken,
      refreshToken
    );

  return globalApolloClient;
};

/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 *
 * withApollo first fetches queries and hydrates the store server-side
 * then passes the data to pages through HOC
 *
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */

const withApollo = ({ ssr = false } = {}) => (PageComponent) => {
  devConLog(['----- start withApollo -----']);

  // WithApollo HOC
  const WithApollo = ({
    // Destructure props provided by WithApollo.getInitialProps
    apolloClient,
    apolloState,
    serverAccessToken,
    refreshToken,
    ...pageProps
  }) => {
    devConLog(['----- start withApollo HOC -----']);

    /* --------------------- Access/Refresh token code --------------------- */

    // Client-side, if no Access token set,
    // set Access token with Access token returned from GIP
    // if (
    //   !typeof window === 'undefined' &&
    //   !getAccessToken() &&
    //   serverAccessToken
    // )
    //   setAccessToken(serverAccessToken);

    /* --------------------------------------------------------------------- */

    let client;

    // Happens on: getDataFromTree & next.js ssr
    if (apolloClient) client = apolloClient;
    // Happens on: next.js csr. - client-side, on initial page load only
    else
      client = initApollo(
        apolloState,
        undefined,
        serverAccessToken,
        refreshToken
      );

    devConLog(['----- end withApollo HOC -----']);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  // Add prop types
  WithApollo.propTypes = {
    // Used for getDataFromTree rendering
    apolloClient: PropTypes.object,
    // Used for client/server rendering
    apolloState: PropTypes.object,
    serverAccessToken: PropTypes.string,
    refreshToken: PropTypes.string,
  };

  // Code execution starts here
  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      devConLog(['----- start withApollo GIP -----']);

      /* -------------------- Access/Refresh token code -------------------- */

      // On initial page load (server-side), if a Refresh token exists,
      // verify it, then attempt to fetch an Access token and store as a
      // global variable

      let serverAccessToken = '';
      let refreshToken = '';

      // Check for cookie header
      // req only available server-side
      if (ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
        // Parse Refresh token
        refreshToken = ctx.req.headers.cookie.replace('rt=', '');

        // If Refresh token available
        if (refreshToken) {
          try {
            // Verify Refresh token
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            // Fetch Access token
            serverAccessToken = await fetchAccessToken(refreshToken);

            // Set Access token
            // setAccessToken(serverAccessToken);
          } catch (error) {
            devConErr(['WithApollo.getInitialProps jwt.verify error: ', error]);
          }
        }
      }

      /* ------------------------------------------------------------------- */

      const inAppContext = Boolean(ctx.ctx);
      const { apolloClient } = initOnContext(
        ctx,
        serverAccessToken,
        refreshToken
      );

      // For wrapped getInitialProps methods,
      // run all GraphQL queries in the component tree,
      // and extract the resulting data.
      // If a page has a getInitialProps, call it.
      // pageProps is now equal to the data returned server-side

      let pageProps = {};

      if (PageComponent.getInitialProps)
        pageProps = await PageComponent.getInitialProps(ctx);
      else if (inAppContext) pageProps = await App.getInitialProps(ctx);

      // Only on the server
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) return pageProps;

        // Only if dataFromTree is enabled
        if (ssr && ctx.AppTree) {
          try {
            // On initial page load, while on the server and inside
            // getInitialProps, we invoke the Apollo method, getDataFromTree.

            // Import `@apollo/react-ssr` dynamically.
            // We don't want to have this in our client bundle.

            // This method returns a promise; at the point in which the promise
            // resolves, our Apollo Client store is completely initialized.
            const { getDataFromTree } = await import('@apollo/react-ssr');

            // Since AppComponents and PageComponents have different context types
            // we need to modify their props a little.
            let props;

            if (inAppContext) props = { ...pageProps, apolloClient };
            else props = { pageProps: { ...pageProps, apolloClient } };

            // Take the Next.js AppTree, determine which queries are needed to render,
            // and fetch them. This method can be pretty slow since it renders
            // your entire AppTree once for every query. Check out apollo fragments
            // if you want to reduce the number of rerenders.
            // https://www.apollographql.com/docs/react/data/fragments/
            await getDataFromTree(<ctx.AppTree {...props} />);
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            devConErr(['Error while running `getDataFromTree`', error]);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      devConLog(['----- end withApollo GIP -----']);

      return {
        ...pageProps,
        // Extract query data from the Apollo store
        apolloState: apolloClient.cache.extract(),
        // Provide the client for ssr. As soon as this payload
        // gets JSON.stringified it will remove itself.
        apolloClient: ctx.apolloClient,
        serverAccessToken,
        refreshToken,
      };
    };
  }

  devConLog(['----- end withApollo -----']);

  return WithApollo;
};

export default withApollo;
