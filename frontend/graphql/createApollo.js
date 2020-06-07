import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
// import {
//   ApolloClient,
//   HttpLink,
//   InMemoryCache,
//   ApolloLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/link-context';
// import { onError } from '@apollo/link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwt from 'jsonwebtoken';
import { getAccessToken } from '../utils/accessToken';
import {
  graphqlUrlDev,
  graphqlUrlProd,
  refreshUrlDev,
  refreshUrlProd,
} from '../config';
// import { persistCache } from 'apollo-cache-persist';
// import { schema } from './schema';
// import typeDefs from './typeDefs';
// import resolvers from './resolvers';
// import initCache from './initCache';

/**
 * Creates and configures the ApolloClient
 * @param {Object} [initialState={}]
 */

const createApollo = (
  initialState,
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  ctx,
  accessToken,
  _refreshToken
) => {
  console.log('----- start createApollo -----');

  // Log GraphQL request & response
  const consoleLogLink = new ApolloLink((operation, forward) => {
    console.log(
      `***** starting request for ${operation.operationName}`,
      `(${typeof window === 'undefined' ? 'server' : 'client'})`
    );

    return forward(operation).map((op) => {
      console.log(`******* ${operation.operationName} res: `, op);
      console.log(`***** ending request for ${operation.operationName}`);

      return op;
    });
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      console.error('errorLink graphQLErrors: ', graphQLErrors);

    if (networkError) console.error('errorLink networkError: ', networkError);
  });

  // Fetch a new Access token if one is present and expired
  const refreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',

    isTokenValidOrUndefined: () => {
      // Return true if:
      // 1. Access token doesn't exist
      // 2. Access token isn't expired
      // False triggers fetchAccessToken

      // If Access token doesn't exist
      if (!accessToken) return true;

      // Check if Access token is valid
      try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        // If valid
        return true;
      } catch (error) {
        console.log('isTokenValidOrUndefined error: ', error);

        // If invalid
        return false;
      }
    },

    fetchAccessToken: () => {
      const refreshUrl =
        process.env.NODE_ENV === 'production' ? refreshUrlProd : refreshUrlDev;

      return fetch(refreshUrl, { method: 'GET', credentials: 'include' });
    },

    handleFetch: (newAccessToken) => {
      accessToken = newAccessToken;

      // setAccessToken(newAccessToken);
    },

    handleError: (error) => {
      console.log('refreshLink handleError: ', error);

      // your custom action here
      // user.logout();
    },
  });

  // Add Access token auth header
  const authLink = setContext((_request, _previousContext) => {
    const theAccessToken = accessToken || getAccessToken();

    return {
      headers: {
        Authorization: theAccessToken ? `Bearer ${theAccessToken}` : '',
      },
    };
  });

  const graphqlUrl =
    process.env.NODE_ENV === 'production' ? graphqlUrlProd : graphqlUrlDev;

  const httpLink = new HttpLink({ uri: graphqlUrl, credentials: 'include' });

  const linkDev = ApolloLink.from([
    // consoleLogLink,
    errorLink,
    refreshLink,
    authLink,
    httpLink,
  ]);

  const linkProd = ApolloLink.from([refreshLink, authLink, httpLink]);

  const link = process.env.NODE_ENV === 'production' ? linkProd : linkDev;

  // Hydrate cache with the initialState created server-side
  const cache = new InMemoryCache({
    // https://www.apollographql.com/docs/react/caching/cache-interaction/#cache-redirects-with-cacheredirects
    cacheRedirects: {
      Query: {
        currentUserIdea: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'Idea', id: args.id }),
      },
    },
  }).restore(initialState);

  // if (!typeof window === 'undefined')
  //   persistCache({ cache, storage: window.localStorage });

  //! should I use the AT or RT?
  // setting the cache here will disable the resolver
  // if (typeof window === 'undefined') initCache(cache, accessToken);

  console.log('----- end createApollo -----');

  return new ApolloClient({
    link,
    cache,
    connectToDevTools: process.env.NODE_ENV !== 'production',
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: Boolean(ctx),
    // typeDefs,
    // resolvers: resolvers(accessToken, refreshToken),
    // schema,
  });
};

export default createApollo;
