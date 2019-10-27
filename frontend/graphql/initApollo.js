import { createApolloClient } from './createApollo';

let apolloClient = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */

const isServer = () => typeof window === 'undefined';

export const initApolloClient = (
  initState,
  serverAccessToken,
  refreshToken
) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return createApolloClient(initState, serverAccessToken, refreshToken);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    // setAccessToken(cookie.parse(document.cookie).test);
    apolloClient = createApolloClient(initState, refreshToken);
  }

  return apolloClient;
};
