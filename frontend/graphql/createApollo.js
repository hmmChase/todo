import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-unfetch';
import { getAccessToken, setAccessToken } from '../utils/authenticate';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
// import { schema } from './schema';

/**
 * Creates and configures the ApolloClient
 * @param {Object} [initialState={}]
 */

const isServer = () => typeof window === 'undefined';
const isDev = () => process.env.NODE_ENV === 'development';

const createApollo = (initialState = {}, serverAccessToken) => {
  // Log GraphQL request & response
  const consoleLogLink = new ApolloLink((operation, forward) => {
    console.log(
      '\n',
      `---------- starting request for ${operation.operationName}`,
      new Date().getMilliseconds(),
      `(client: ${!isServer()}, server: ${isServer()})`
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

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log('errorLink graphQLErrors: ', graphQLErrors);
    console.log('errorLink networkError: ', networkError);
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',

    isTokenValidOrUndefined: () => {
      // Return true if:
      // 1. Access token doesn't exist
      // 2. Access token isn't expired

      // Read Access token
      const accessToken = getAccessToken();

      // If it's blank, return true
      if (!accessToken) return true;

      // Check if Access token is expired
      try {
        // Get expiration date
        const { exp } = jwtDecode(accessToken);

        // If expired, return false
        if (Date.now() >= exp * 1000) return false;

        return true;
      } catch {
        return false;
      }
    },

    fetchAccessToken: () => {
      const refreshUrl = isDev()
        ? process.env.DEV_REFRESH_URL
        : process.env.PROD_REFRESH_URL;

      return fetch(refreshUrl, { method: 'GET', credentials: 'include' });
    },

    handleFetch: accessToken => setAccessToken(accessToken),

    handleResponse: (_operation, _accessTokenField) => _response => {
      // here you can parse response, handle errors, prepare returned token to
      // further operations
      // returned object should be like this:
      // {
      //    access_token: 'token string here'
      // }
    },

    handleError: err => {
      if (isDev()) console.error('refreshLink handleError: ', err);

      // your custom action here
      // user.logout();
    }
  });

  // Add cookie to request header
  const authLink = setContext((_request, _previousContext) => {
    const accessToken = isServer() ? serverAccessToken : getAccessToken();

    return {
      headers: { Authorization: accessToken ? `Bearer ${accessToken}` : '' }
    };
  });

  const graphqlUrl = isDev()
    ? process.env.DEV_GRAPHQL_URL
    : process.env.PROD_GRAPHQL_URL;

  const httpLink = new HttpLink({
    uri: graphqlUrl,
    credentials: 'include',
    fetch
  });

  const link = isDev()
    ? ApolloLink.from([
        consoleLogLink,
        errorLink,
        refreshLink,
        authLink,
        httpLink
      ])
    : ApolloLink.from([refreshLink, authLink, httpLink]);

  // Hydrate cache with the initialState created server-side
  const cache = new InMemoryCache().restore(initialState);

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
