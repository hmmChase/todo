import createApollo from './createApollo';

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param {Object} initialState
 */

let apolloClient = null;

export default (initialState, serverAccessToken) => {
  // Make sure to create a new client for every server-side request,
  // so that data isn't shared between connections (which would be bad)
  if (typeof window === 'undefined')
    return createApollo(initialState, serverAccessToken);

  // Reuse Apollo Client client-side
  if (!apolloClient) apolloClient = createApollo(initialState);

  return apolloClient;
};
