import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

import resolvers from './resolvers';
import typeDefs from './schema';

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */

export const createApolloClient = (initialState = {}) => {
  const isBrowser = typeof window !== 'undefined';
  const isDev = process.env.NODE_ENV === 'development';

  const fetchOptions = {};

  // // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // // 'https-proxy-agent' is required here because it's a sever-side only module
  // if (typeof window === 'undefined') {
  //   if (process.env.https_proxy) {
  //     fetchOptions.agent = new (require('https-proxy-agent'))(
  //       process.env.https_proxy
  //     )
  //   }
  // }

  // Log GraphQL request & response
  const consoleLogLink = new ApolloLink((operation, forward) => {
    console.log(
      '\n',
      `---------- starting request for ${operation.operationName}`,
      new Date().getMilliseconds(),
      `(client: ${isBrowser}, server: ${!isBrowser})`
    );

    return forward(operation).map(op => {
      console.log(`${operation.operationName} res: `, op);
      console.log(
        '\n',
        `---------- ending request for ${operation.operationName}`,
        new Date().getMilliseconds()
      );

      return op;
    });
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      console.log(': networkError', networkError);
      console.log(': graphQLErrors', graphQLErrors);
    }
  );

  const newHttpLink = new HttpLink({
    uri: isDev
      ? process.env.DEV_GRAPHQL_ENDPOINT
      : process.env.PROD_GRAPHQL_ENDPOINT,
    credentials: 'include',
    fetch,
    fetchOptions
  });

  const cache = new InMemoryCache().restore(initialState);

  const link = isDev
    ? ApolloLink.from([consoleLogLink, errorLink, newHttpLink])
    : ApolloLink.from([errorLink, newHttpLink]);

  // if (!isBrowser) {
  //   console.log('jdslkfjds token: ', token);

  //   authenticate(cache, token);
  // }

  return new ApolloClient({
    link,
    cache,
    connectToDevTools: isBrowser,
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: !isBrowser,
    typeDefs,
    resolvers
  });
};
