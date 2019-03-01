import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { graphQLEndpoint } from '../config';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function createClient(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: graphQLEndpoint, // Server URL (must be absolute)
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createClient(initialState);
  }

  return apolloClient;
}
