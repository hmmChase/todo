import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwt from 'jsonwebtoken';
import { getAccessToken, setAccessToken } from '../utils/accessToken';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { devConLog, devConErr } from '../utils/devCon';
import { graphqlUrl, refreshUrl, accessTokenSecret } from '../constants';
// import initCache from './initCache';
// import { schema } from './schema';

/**
 * Creates and configures the ApolloClient
 * @param {Object} [initialState={}]
 */

const isServer = () => typeof window === 'undefined';

const createApollo = (initialState = {}, serverAccessToken) => {
  devConLog(['----- start createApollo -----']);

  // Log GraphQL request & response
  const consoleLogLink = new ApolloLink((operation, forward) => {
    devConLog([
      `***** starting request for ${operation.operationName}`,
      `(${isServer() ? 'server' : 'client'})`
    ]);

    return forward(operation).map(op => {
      devConLog([`******* ${operation.operationName} res: `, op]);
      devConLog([`***** ending request for ${operation.operationName}`]);

      return op;
    });
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) devConErr(['errorLink graphQLErrors: ', graphQLErrors]);
    if (networkError) devConErr(['errorLink networkError: ', networkError]);
  });

  // Fetch a new Access token if one is present and expired
  const refreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',

    isTokenValidOrUndefined: () => {
      // Return true if:
      // 1. Access token doesn't exist
      // 2. Access token isn't expired
      // False triggers fetchAccessToken

      // Read Access token
      const accessToken = serverAccessToken || getAccessToken();

      // If Access token doesn't exist
      if (!accessToken) return true;

      // Check if Access token is valid
      try {
        jwt.verify(accessToken, accessTokenSecret);

        // If valid
        return true;
      } catch (error) {
        devConErr(['Access token verify error: ', error]);

        // If invalid
        return false;
      }
    },

    fetchAccessToken: () => {
      return fetch(refreshUrl, { method: 'GET', credentials: 'include' });
    },

    handleFetch: accessToken => setAccessToken(accessToken),

    handleError: error => {
      devConLog(['refreshLink handleError: ', error]);

      // your custom action here
      // user.logout();
    }
  });

  // Add cookie to request header
  const authLink = setContext((_request, _previousContext) => {
    const accessToken = serverAccessToken || getAccessToken();

    return {
      headers: { Authorization: accessToken ? `Bearer ${accessToken}` : '' }
    };
  });

  const httpLink = new HttpLink({
    uri: graphqlUrl,
    credentials: 'include'
  });

  const link = ApolloLink.from([
    consoleLogLink,
    errorLink,
    refreshLink,
    authLink,
    httpLink
  ]);

  // Hydrate cache with the initialState created server-side
  const cache = new InMemoryCache().restore(initialState);

  // if (isServer) initCache(cache);

  devConLog(['----- end createApollo -----']);

  return new ApolloClient({
    link,
    cache,
    connectToDevTools: !isServer(),
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: isServer(),
    typeDefs,
    resolvers
    // schema
  });
};

export default createApollo;
