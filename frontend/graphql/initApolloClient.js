import { createApolloClient } from './createApolloClient';

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */

let apolloClient = null;

export const initApolloClient = (...args) => {
  console.log('initApolloClient ...args: ', args);

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '----------start initApolloClient----------',
      new Date().getMilliseconds()
    );
  }

  // Make sure to create a new client for every server-side request so
  // that dataisn't shared between connections (which would be bad)
  if (typeof window === 'undefined') return createApolloClient(...args);

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = createApolloClient(...args);

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '----------end initApolloClient----------',
      new Date().getMilliseconds()
    );
  }

  return apolloClient;
};
