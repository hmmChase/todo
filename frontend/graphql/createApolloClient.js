/* eslint-disable global-require */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-unfetch';

// import { schema } from './schema';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */

export const createApolloClient = (initialState = {}) => {
  const isBrowser = typeof window !== 'undefined';
  const isDev = process.env.NODE_ENV === 'development';

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
    fetch
  });

  const cache = new InMemoryCache().restore(initialState);

  const link = isDev
    ? ApolloLink.from([consoleLogLink, errorLink, newHttpLink])
    : ApolloLink.from([newHttpLink]);

  // const link = isDev
  //   ? ApolloLink.from([consoleLogLink, errorLink, createIsomorphLink()])
  //   : ApolloLink.from([errorLink, createIsomorphLink()]);

  return new ApolloClient({
    link,
    cache,
    connectToDevTools: isBrowser,
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: !isBrowser,
    // schema,
    typeDefs,
    resolvers
  });
};

// function createIsomorphLink() {
//   const fetchOptions = {};

//   if (!isBrowser) {
//     const { SchemaLink } = require('apollo-link-schema');
//     const { schema } = require('./schema');
//     return new SchemaLink({ schema });
//   }

//   const { HttpLink } = require('apollo-link-http');

//   return new HttpLink({
//     uri: isDev
//       ? process.env.DEV_GRAPHQL_ENDPOINT
//       : process.env.PROD_GRAPHQL_ENDPOINT,
//     credentials: 'include',
//     fetch
//   });
// }
