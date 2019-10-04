import { createApolloClient } from './createApolloClient';

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */

let apolloClient = null;

export const initApolloClient = (...args) => {
  // Make sure to create a new client for every server-side request so
  // that dataisn't shared between connections (which would be bad)
  if (typeof window === 'undefined') return createApolloClient(...args);

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = createApolloClient(...args);

  return apolloClient;
};
