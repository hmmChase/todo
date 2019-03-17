/* eslint-disable no-console */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import fetch from 'isomorphic-unfetch';
import { graphQLEndpoint } from '../config';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const createClient = (initialState) => {
  const httpLink = createHttpLink({
    uri: graphQLEndpoint,
    // Specifies that Apollo will include the headers it gets in the response from the server
    credentials: 'include'
  });

  // const authLink = new ApolloLink((operation, forward) => {
  //   operation.setContext((headers = {}) => ({
  //     fetchOptions: {
  //       credentials: 'include'
  //     },
  //     headers
  //   }));
  //   return forward(operation);
  // });

  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors) {
  //     graphQLErrors.map(({ message, locations, path }) => console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  //   }
  //   if (networkError) console.error(`[Network error]: ${networkError}`);
  // });

  return new ApolloClient({
    // Specifies what Apollo will use for every request to the GraphQL endpoint
    link: httpLink,
    // link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache().restore(initialState || {}),
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    connectToDevTools: process.browser
  });
};

export default (initialState) => {
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
};
