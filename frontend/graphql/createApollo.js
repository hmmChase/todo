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

  /* ctx & headers available on server */
  // if (!isBrowser) {
  //   console.log(': withApollo ctx', Object.keys(ctx));
  //   console.log(': withApollo ctx', Object.keys(ctx.ctx));
  //   console.log(': withApollo headers', Object.keys(ctx.headers));
  //   console.log(': withApollo cookie', ctx.headers.cookie);
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

    fetchAccessToken: () =>
      fetch('http://localhost:6969/refresh', {
        method: 'POST',
        credentials: 'include'
      }),

    handleFetch: accessToken => {
      setAccessToken(accessToken);
    },

    handleError: err => {
      // console.error(err);
      console.warn('Your refresh token is invalid. Try to relogin');
    }
  });

  // Add cookie to request header
  const authLink = setContext((request, previousContext) => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' }
    };
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
    ssrMode: isServer(), // Disables forceFetch on the server (so queries are only run once)

    typeDefs,
    resolvers
  });
};

export default createApollo;

// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import fetch from 'isomorphic-unfetch';
// import { TokenRefreshLink } from 'apollo-link-token-refresh';
// import jwtDecode from 'jwt-decode';
// import { onError } from 'apollo-link-error';
// import { ApolloLink } from 'apollo-link';
// import { getAccessToken, setAccessToken } from '../utils/authenticate';

// import { typeDefs } from './typeDefs';
// import { resolvers } from './resolvers';

// const isServer = () => typeof window === 'undefined';
// const isDev = () => process.env.NODE_ENV === 'development';

// /**
//  * Creates and configures the ApolloClient
//  * @param  {Object} [initialState={}]
//  * @param  {Object} config
//  */

// export const createApolloClient = (initialState = {}, serverAccessToken) => {
//   const httpLink = new HttpLink({
//     uri: isDev() ? process.env.DEV_GRAPHQL_URL : process.env.PROD_GRAPHQL_URL,
//     credentials: 'include',
//     fetch
//   });

//   const consoleLogLink = new ApolloLink((operation, forward) => {
//     console.log(
//       '\n',
//       `---------- starting request for ${operation.operationName}`,
//       new Date().getMilliseconds(),
//       `(client: ${!isServer()}, server: ${isServer()})`
//     );

//     return forward(operation).map(op => {
//       console.log(`${operation.operationName} res: `, op);
//       console.log(
//         '\n',
//         `---------- ending request for ${operation.operationName}`,
//         new Date().getMilliseconds()
//       );

//       return op;
//     });
//   });

//   const refreshLink = new TokenRefreshLink({
//     accessTokenField: 'accessToken',
//     isTokenValidOrUndefined: () => {
//       const token = getAccessToken();

//       if (!token) {
//         return true;
//       }

//       try {
//         const { exp } = jwtDecode(token);
//         if (Date.now() >= exp * 1000) {
//           return false;
//         }
//         return true;
//       } catch {
//         return false;
//       }
//     },
//     fetchAccessToken: () =>
//       fetch('http://localhost:6969/refresh', {
//         method: 'POST',
//         credentials: 'include'
//       }),
//     handleFetch: accessToken => {
//       setAccessToken(accessToken);
//     },
//     handleError: err => {
//       console.warn('Your refresh token is invalid. Try to relogin');
//       console.error(err);
//     }
//   });

//   const authLink = setContext((_request, { headers }) => {
//     const token = isServer() ? serverAccessToken : getAccessToken();
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : ''
//       }
//     };
//   });

//   const errorLink = onError(({ graphQLErrors, networkError }) => {
//     console.log('errorLink graphQLErrors: ', graphQLErrors);
//     console.log('errorLink networkError: ', networkError);
//   });

//   return new ApolloClient({
//     ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
//     link: ApolloLink.from([
//       consoleLogLink,
//       refreshLink,
//       authLink,
//       errorLink,
//       httpLink
//     ]),
//     cache: new InMemoryCache().restore(initialState),
//     typeDefs,
//     resolvers
//   });
// };

// /* eslint-disable global-require */
// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloLink } from 'apollo-link';
// import { HttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import { TokenRefreshLink } from 'apollo-link-token-refresh';
// import { onError } from 'apollo-link-error';
// import jwtDecode from 'jwt-decode';
// import fetch from 'isomorphic-unfetch';

// // import { schema } from './schema';
// import { typeDefs } from './typeDefs';
// import { resolvers } from './resolvers';
// import { setAccessToken, getAccessToken } from '../utils/authenticate';

// /**
//  * Creates and configures the ApolloClient
//  * @param  {Object} [initialState={}]
//  * @param  {Object} config
//  */

// export const createApolloClient = (
//   initialState = {},
//   headers,
//   serverAccessToken
// ) => {
//   if (process.env.NODE_ENV === 'development') {
//     console.log(
//       '----------start createApolloClient----------',
//       new Date().getMilliseconds()
//     );
//   }

//   console.log('createApolloClient serverAccessToken: ', serverAccessToken);

//   const isBrowser = typeof window !== 'undefined';
//   const isDev = process.env.NODE_ENV === 'development';

//   // Log GraphQL request & response
//   const consoleLogLink = new ApolloLink((operation, forward) => {
//     console.log(
//       '\n',
//       `---------- starting request for ${operation.operationName}`,
//       new Date().getMilliseconds(),
//       `(client: ${isBrowser}, server: ${!isBrowser})`
//     );

//     return forward(operation).map(op => {
//       console.log(`${operation.operationName} res: `, op);
//       console.log(
//         '\n',
//         `---------- ending request for ${operation.operationName}`,
//         new Date().getMilliseconds()
//       );

//       return op;
//     });
//   });

//   const errorLink = onError(
//     ({ graphQLErrors, networkError, operation, forward }) => {
//       console.log('networkError: ', networkError);
//       console.log('graphQLErrors: ', graphQLErrors);
//     }
//   );

//   const refreshLink = new TokenRefreshLink({
//     accessTokenField: 'accessToken',

//     isTokenValidOrUndefined: () => {
//       if (process.env.NODE_ENV === 'development') {
//         console.log(
//           '----------isTokenValidOrUndefined----------',
//           new Date().getMilliseconds()
//         );
//       }

//       const accessToken = getAccessToken();
//       console.log('isTokenValidOrUndefined accessToken', accessToken);

//       if (!accessToken) {
//         console.log('true 1');

//         return true;
//       }

//       try {
//         const { exp } = jwtDecode(accessToken);
//         // console.log('isTokenValidOrUndefined exp: ', exp);
//         // console.log('Date.now() >= exp * 1000: ', Date.now() >= exp * 1000);

//         if (Date.now() >= exp * 1000) {
//           console.log('false 2');

//           return false;
//         }

//         console.log('true 3');

//         return true;
//       } catch (err) {
//         console.log('TCL: err', err);
//         console.log('false 4');

//         return false;
//       }
//     },

//     fetchAccessToken: () => {
//       if (process.env.NODE_ENV === 'development') {
//         console.log(
//           '----------fetchAccessToken----------',
//           new Date().getMilliseconds()
//         );
//       }

//       const url = isDev
//         ? process.env.DEV_REFRESH_URL
//         : process.env.PROD_REFRESH_URL;

//       // const server = typeof window === 'undefined';

//       return fetch(url, {
//         method: 'POST',
//         credentials: 'include'
//         // headers: {
//         // ...headers
//         // cookie: `rt=${headers.cookie.replace('rt=', '')}`,
//         // cookie: `rt=${getRefreshToken()}`,
//         // server: `server=${!server}`
//         // }
//       });
//     },

//     handleFetch: accessToken => {
//       if (process.env.NODE_ENV === 'development') {
//         console.log(
//           '----------handleFetch----------',
//           new Date().getMilliseconds()
//         );
//       }

//       setAccessToken(accessToken);
//     },

//     handleError: err => {
//       if (process.env.NODE_ENV === 'development') {
//         console.warn('Your refresh token is invalid. Try to relogin');
//         console.error('refreshLink handleError: ', err);
//       }
//     }
//   });

//   // Send the access token with each request
//   const authLink = setContext((req, previousContext) => {
//     const accessToken =      typeof window === 'undefined' ? serverAccessToken : getAccessToken();

//     // let accessToken = '';

//     // if (typeof window === 'undefined') {
//     //   console.log('authLink server, ', typeof window === 'undefined');

//     //   accessToken = serverAccessToken;

//     //   console.log('authLink accessToken 1: ', accessToken);
//     // } else {
//     //   console.log('authLink server, ', typeof window === 'undefined');

//     //   accessToken = getAccessToken();

//     //   console.log('authLink accessToken 2: ', accessToken);
//     // }

//     return {
//       headers: {
//         server: `server=${typeof window === 'undefined'}`,
//         authorization: accessToken ? `Bearer ${accessToken}` : ''
//         // cookie: `rt=${headers.cookie.replace('rt=', '')}`
//       }
//     };
//   });

//   const httpLink = new HttpLink({
//     uri: isDev ? process.env.DEV_GRAPHQL_URL : process.env.PROD_GRAPHQL_URL,
//     credentials: 'include',
//     fetch
//   });

//   const cache = new InMemoryCache().restore(initialState);

//   // const link = isDev
//   //   ? ApolloLink.from([
//   //       consoleLogLink,
//   //       errorLink,
//   //       refreshLink,
//   //       authLink,
//   //       httpLink
//   //     ])
//   //   : ApolloLink.from([refreshLink, authLink, httpLink]);

//   const link = isDev
//     ? ApolloLink.from([
//       consoleLogLink,
//       errorLink,
//       refreshLink,
//       authLink,
//       httpLink
//     ])
//     : ApolloLink.from([refreshLink, authLink, httpLink]);

//   // const link = isDev
//   //   ? ApolloLink.from([consoleLogLink, errorLink, createIsomorphLink()])
//   //   : ApolloLink.from([errorLink, createIsomorphLink()]);

//   if (process.env.NODE_ENV === 'development') {
//     console.log(
//       '----------end createApolloClient----------',
//       new Date().getMilliseconds()
//     );
//   }

//   return new ApolloClient({
//     link,
//     cache,
//     connectToDevTools: isBrowser,
//     // Disables forceFetch on the server (so queries are only run once)
//     ssrMode: !isBrowser,
//     // schema,
//     typeDefs,
//     resolvers
//   });
// };

// // // function createIsomorphLink() {
// // //   const fetchOptions = {};

// // //   if (!isBrowser) {
// // //     const { SchemaLink } = require('apollo-link-schema');
// // //     const { schema } = require('./schema');
// // //     return new SchemaLink({ schema });
// // //   }

// // //   const { HttpLink } = require('apollo-link-http');

// // //   return new HttpLink({
// // //     uri: isDev
// // //       ? process.env.DEV_GRAPHQL_URL
// // //       : process.env.PROD_GRAPHQL_URL,
// // //     credentials: 'include',
// // //     fetch
// // //   });
// // // }
