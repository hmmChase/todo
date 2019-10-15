/* eslint-disable global-require */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-unfetch';

// import { schema } from './schema';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { setAccessToken, getAccessToken } from '../utils/authenticate';

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */

export const createApolloClient = (initialState = {}, serverAccessToken) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '----------start createApolloClient----------',
      new Date().getMilliseconds()
    );
  }

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
      console.log('networkError: ', networkError);
      console.log('graphQLErrors: ', graphQLErrors);
    }
  );

  const refreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',

    isTokenValidOrUndefined: () => {
      console.log('----------isTokenValidOrUndefined----------');

      const accessToken = getAccessToken();

      if (!accessToken) return true;

      try {
        const { exp } = jwtDecode(accessToken);

        if (Date.now() >= exp * 1000) return false;

        return true;
      } catch {
        return false;
      }
    },

    fetchAccessToken: () => {
      console.log('----------fetchAccessToken----------');

      return fetch('http://localhost:6969/refresh_token', {
        method: 'POST',
        credentials: 'include',
        headers: { cookie: `rt=${refreshToken}` }
      });
    },

    handleFetch: accessToken => {
      console.log('----------handleFetch----------');

      setAccessToken(accessToken);
    },

    handleError: err => {
      console.warn('Your refresh token is invalid. Try to relogin');
      console.error(err);
    }
  });

  const authLink = setContext((req, previousContext) => {
    let accessToken = '';

    if (typeof window === 'undefined') accessToken = serverAccessToken;
    else accessToken = getAccessToken();

    return {
      headers: {
        ...previousContext.headers,
        authorization: accessToken ? `bearer ${accessToken}` : ''
      }
    };
  });

  const httpLink = new HttpLink({
    uri: isDev
      ? process.env.DEV_GRAPHQL_ENDPOINT
      : process.env.PROD_GRAPHQL_ENDPOINT,
    credentials: 'include',
    fetch
  });

  const cache = new InMemoryCache().restore(initialState);

  const link = isDev
    ? ApolloLink.from([
      consoleLogLink,
      errorLink,
      refreshLink,
      authLink,
      httpLink
    ])
    : ApolloLink.from([refreshLink, authLink, httpLink]);

  // const link = isDev
  //   ? ApolloLink.from([consoleLogLink, errorLink, createIsomorphLink()])
  //   : ApolloLink.from([errorLink, createIsomorphLink()]);

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '----------end createApolloClient----------',
      new Date().getMilliseconds()
    );
  }

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
