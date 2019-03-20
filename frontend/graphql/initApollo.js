/* eslint-disable no-console */
// https://github.com/matthew-andrews/isomorphic-fetch/issues/141

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
// import { onError } from 'apollo-link-error';
// import { ApolloLink } from 'apollo-link';

import fetch from 'isomorphic-unfetch';
import { graphQLEndpoint } from '../config';

let apolloClient = null;

const createClient = (initialState, { getToken }) => {
  // Specifies what Apollo will use for every request to the GraphQL endpoint
  const httpLink = createHttpLink({
    uri: graphQLEndpoint,
    // Specifies that Apollo will include the headers it gets in the response from the server
    credentials: 'include',
    fetch
  });

  // Workaround for fetch not sending creditials when fetching on the server
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: `token=${token}`
      }
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    connectToDevTools: process.browser
  });
};

export default (initialState, options) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createClient(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createClient(initialState, options);
  }

  return apolloClient;
};
