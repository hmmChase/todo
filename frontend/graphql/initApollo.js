import createApollo from './createApollo';

let apolloClient = null;

const isServer = () => typeof window === 'undefined';

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */

const initApollo = (initState, serverAccessToken) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return createApollo(initState, serverAccessToken);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    // setAccessToken(cookie.parse(document.cookie).test);
    apolloClient = createApollo(initState);
  }

  return apolloClient;
};

export default initApollo;
