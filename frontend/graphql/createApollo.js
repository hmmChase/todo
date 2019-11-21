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
// import { schema } from './schema';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

// withApollo first fetches queries and hydrates the store server-side
// before sending the page to the client
// https://github.com/lfades/next-with-apollo/issues/69

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */

const isServer = () => typeof window === 'undefined';
const isDev = () => process.env.NODE_ENV === 'development';

const createApollo = (initialState = {}, serverAccessToken) => {
  /* initialState available on client */
  // if (isBrowser) {
  //   console.log(': withApollo ctx', Object.keys(ctx));
  //   console.log(': withApollo initialState', ctx.initialState);
  // }

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
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    },

    fetchAccessToken: () => {
      const url = isDev
        ? process.env.DEV_REFRESH_URL
        : process.env.PROD_REFRESH_URL;

      return fetch(url, {
        method: 'POST',
        credentials: 'include'
      });
    },

    handleFetch: accessToken => setAccessToken(accessToken),

    handleError: err => {
      if (isDev()) {
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error('refreshLink handleError: ', err);
      }
    }
  });

  // Add cookie to request header
  const authLink = setContext((_request, _previousContext) => {
    const token = isServer() ? serverAccessToken : getAccessToken();

    return { headers: { authorization: token ? `Bearer ${token}` : '' } };
  });

  // const authLink = new ApolloLink((operation, forward) => {
  //   operation.setContext({ headers: ctx.headers });

  //   return forward(operation);
  // });

  const httpLink = new HttpLink({
    uri: isDev() ? process.env.DEV_GRAPHQL_URL : process.env.PROD_GRAPHQL_URL,
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
    // schema,
    typeDefs,
    resolvers
  });
};

export default createApollo;

// ---------------------------------------

// // function createIsomorphLink() {
// //   const fetchOptions = {};

// //   if (!isBrowser) {
// //     const { SchemaLink } = require('apollo-link-schema');
// //     const { schema } = require('./schema');
// //     return new SchemaLink({ schema });
// //   }

// //   const { HttpLink } = require('apollo-link-http');

// //   return new HttpLink({
// //     uri: isDev
// //       ? process.env.DEV_GRAPHQL_URL
// //       : process.env.PROD_GRAPHQL_URL,
// //     credentials: 'include',
// //     fetch
// //   });
// // }

// ---------------------------------------

// const refreshAuthToken = async refreshToken => {
//   // Get refresh token from cookies
//   console.log('.............................................');
//   console.log('refresh auth token with token:');
//   console.log(refreshToken);
//   console.log('.............................................');

//   // Get new auth token from server
//   return client.mutate({
//     mutation: REFRESH_AUTH_TOKEN,
//     variables: { refreshToken }
//   });
// };

// const errorLink = onError(
//   ({ graphQLErrors, networkError, operation, forward }) => {
//     console.log(': networkError', networkError);
//     console.log(': graphQLErrors', graphQLErrors);
//     if (graphQLErrors) {
//       for (const err of graphQLErrors) {
//         const errorObject = {
//           code: err.extensions.code,
//           operation: operation.operationName,
//           message: err.message
//         };

//         console.log(
//           '[GraphQL error]: ',
//           new Date().getMilliseconds(),
//           errorObject
//         );

//         switch (err.extensions.code) {
//           // AuthenticationError
//           case 'UNAUTHENTICATED':
//             // return forward(operation);
//             break;

//           // ForbiddenError
//           case 'FORBIDDEN':
//             if (process.browser) Router.push('/');

//             // return forward(operation);
//             break;

//           default:
//             // return forward(operation);
//             break;
//         }
//       }
//     }

//     // ----------------------------------------

//     // If error is due to unathenticated user request
//     // and a refresh token is available
//     // const { extensions } = graphQLErrors[0];
//     // const refreshToken = getTokens()['x-token-refresh'];

//     // if (extensions.code === 'UNAUTHENTICATED' && refreshToken) {
//     //   // Create a new Observerable
//     //   return new Observable(async observer => {
//     //     // Refresh the access token
//     //     refreshAccessToken(refreshToken, client)
//     //       // On successful refresh...
//     //       .then(newTokens => {
//     //         // Handle cookies
//     //         if (!newTokens.token) {
//     //           // Delete cookies if no new access token provided
//     //           destroyCookie(ctx, 'x-token');
//     //           destroyCookie(ctx, 'x-token-refresh');
//     //         } else {
//     //           // Update cookies if new access token available
//     //           setCookie(ctx, 'x-token', newTokens.token, {
//     //             maxAge: 30 * 60
//     //           });

//     //           setCookie(ctx, 'x-token-refresh', newTokens.refreshToken, {
//     //             maxAge: 30 * 24 * 60 * 60
//     //           });
//     //         }

//     //         // Bind observable subscribers
//     //         const subscriber = {
//     //           next: observer.next.bind(observer),
//     //           error: observer.error.bind(observer),
//     //           complete: observer.complete.bind(observer)
//     //         };

//     //         // Retry last failed request
//     //         forward(operation).subscribe(subscriber);
//     //       })

//     //       // On refresh failure...
//     //       .catch(error => {
//     //         observer.error(error);
//     //       });
//     //   });
//     // }

//     // ----------------------------------------

//     // for (const err of graphQLErrors) {
//     //   switch (err.extensions.code) {
//     //     // AuthenticationError
//     //     case 'UNAUTHENTICATED':
//     //       // Modify the operation context with a new token
//     //       // const oldHeaders = operation.getContext().headers;

//     //       // operation.setContext({
//     //       //   headers: {
//     //       //     ...oldHeaders,
//     //       //     authorization: getNewToken()
//     //       //   }
//     //       // });

//     //       // Retry the request, returning the new observable
//     //       return forward(operation);

//     //     // ----------------------------------------

//     //     // const doRefresh = async () => {
//     //     //   const refreshToken = await getTokens()['x-token-refresh'];
//     //     //   const data = await refreshAuthToken(refreshToken);

//     //     //   console.log('.......................');
//     //     //   console.log('results of refreshAuthToken (success!!)');
//     //     //   console.log(data.data.refreshAuthToken.token);
//     //     //   console.log('.......................');

//     //     //   await cookie.serialize(
//     //     //     'x-token-new',
//     //     //     data.data.refreshAuthToken.token,
//     //     //     {}
//     //     //   );

//     //     //   await operation.setContext({
//     //     //     headers: {
//     //     //       ...headers,
//     //     //       'x-token': data.data.refreshAuthToken.token
//     //     //     }
//     //     //   });

//     // return forward(operation);
//     //     // };

//     //     // doRefresh();
//     //   }
//     // }

//     if (networkError) {
//       const errorObject = {
//         code: networkError.code,
//         message: networkError.message
//       };

//       console.log('[Network error]: ', errorObject);

//       // if you would also like to retry automatically on
//       // network errors, we recommend that you use
//       // apollo-link-retry
//     }

//     if (operation.operationName === 'IgnoreErrorsQuery') {
//       response.errors = null;
//     }
//   }
// );
