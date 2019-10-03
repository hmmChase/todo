import { createApolloClient } from './createApolloClient';

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */

export const initApolloClient = (...args) => {
  const isBrowser = typeof window !== 'undefined';

  // Make sure to create a new client for every server-side request so
  // that dataisn't shared between connections (which would be bad)
  if (!isBrowser) return createApolloClient(...args);

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = createApolloClient(...args);

  return apolloClient;
};
