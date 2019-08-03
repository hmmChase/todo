/* eslint-disable no-restricted-syntax */
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import authenticate from '../utils/authenticate';
import typeDefs from './schema';
import resolvers from './resolvers';

// withApollo first fetches queries and hydrates the store server-side
// before sending the page to the client
// https://github.com/lfades/next-with-apollo/issues/69

const createClient = ctx => {
  console.log('withApollo', new Date().getMilliseconds());

  const isBrowser = typeof window !== 'undefined';
  const isDevelopment = process.env.NODE_ENV === 'development';

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

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      console.log(': networkError', networkError);
      console.log(': graphQLErrors', graphQLErrors);
      //   if (graphQLErrors) {
      //     for (const err of graphQLErrors) {
      //       const errorObject = {
      //         code: err.extensions.code,
      //         operation: operation.operationName,
      //         message: err.message
      //       };

      //       console.log(
      //         '[GraphQL error]: ',
      //         new Date().getMilliseconds(),
      //         errorObject
      //       );

      //       switch (err.extensions.code) {
      //         // AuthenticationError
      //         case 'UNAUTHENTICATED':
      //           // return forward(operation);
      //           break;

      //         // ForbiddenError
      //         case 'FORBIDDEN':
      //           if (process.browser) Router.push('/');

      //           // return forward(operation);
      //           break;

      //         default:
      //           // return forward(operation);
      //           break;
      //       }
      //     }
      //   }

      //   // ----------------------------------------

      //   // If error is due to unathenticated user request
      //   // and a refresh token is available
      //   // const { extensions } = graphQLErrors[0];
      //   // const refreshToken = getTokens()['x-token-refresh'];

      //   // if (extensions.code === 'UNAUTHENTICATED' && refreshToken) {
      //   //   // Create a new Observerable
      //   //   return new Observable(async observer => {
      //   //     // Refresh the access token
      //   //     refreshAccessToken(refreshToken, client)
      //   //       // On successful refresh...
      //   //       .then(newTokens => {
      //   //         // Handle cookies
      //   //         if (!newTokens.token) {
      //   //           // Delete cookies if no new access token provided
      //   //           destroyCookie(ctx, 'x-token');
      //   //           destroyCookie(ctx, 'x-token-refresh');
      //   //         } else {
      //   //           // Update cookies if new access token available
      //   //           setCookie(ctx, 'x-token', newTokens.token, {
      //   //             maxAge: 30 * 60
      //   //           });

      //   //           setCookie(ctx, 'x-token-refresh', newTokens.refreshToken, {
      //   //             maxAge: 30 * 24 * 60 * 60
      //   //           });
      //   //         }

      //   //         // Bind observable subscribers
      //   //         const subscriber = {
      //   //           next: observer.next.bind(observer),
      //   //           error: observer.error.bind(observer),
      //   //           complete: observer.complete.bind(observer)
      //   //         };

      //   //         // Retry last failed request
      //   //         forward(operation).subscribe(subscriber);
      //   //       })

      //   //       // On refresh failure...
      //   //       .catch(error => {
      //   //         observer.error(error);
      //   //       });
      //   //   });
      //   // }

      //   // ----------------------------------------

      //   // for (const err of graphQLErrors) {
      //   //   switch (err.extensions.code) {
      //   //     // AuthenticationError
      //   //     case 'UNAUTHENTICATED':
      //   //       // Modify the operation context with a new token
      //   //       // const oldHeaders = operation.getContext().headers;

      //   //       // operation.setContext({
      //   //       //   headers: {
      //   //       //     ...oldHeaders,
      //   //       //     authorization: getNewToken()
      //   //       //   }
      //   //       // });

      //   //       // Retry the request, returning the new observable
      //   //       return forward(operation);

      //   //     // ----------------------------------------

      //   //     // const doRefresh = async () => {
      //   //     //   const refreshToken = await getTokens()['x-token-refresh'];
      //   //     //   const data = await refreshAuthToken(refreshToken);

      //   //     //   console.log('.......................');
      //   //     //   console.log('results of refreshAuthToken (success!!)');
      //   //     //   console.log(data.data.refreshAuthToken.token);
      //   //     //   console.log('.......................');

      //   //     //   await cookie.serialize(
      //   //     //     'x-token-new',
      //   //     //     data.data.refreshAuthToken.token,
      //   //     //     {}
      //   //     //   );

      //   //     //   await operation.setContext({
      //   //     //     headers: {
      //   //     //       ...headers,
      //   //     //       'x-token': data.data.refreshAuthToken.token
      //   //     //     }
      //   //     //   });

      //   // return forward(operation);
      //   //     // };

      //   //     // doRefresh();
      //   //   }
      //   // }

      //   if (networkError) {
      //     const errorObject = {
      //       code: networkError.code,
      //       message: networkError.message
      //     };

      //     console.log('[Network error]: ', errorObject);

      //     // if you would also like to retry automatically on
      //     // network errors, we recommend that you use
      //     // apollo-link-retry
      //   }

      // if (operation.operationName === 'IgnoreErrorsQuery') {
      //   response.errors = null;
      // }
    }
  );

  // Add cookie to request header
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({ headers: ctx.headers });

    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: isDevelopment
      ? process.env.DEV_GRAPHQL_ENDPOINT
      : process.env.PROD_GRAPHQL_ENDPOINT,
    credentials: 'include'
  });

  const link = isDevelopment
    ? ApolloLink.from([consoleLogLink, errorLink, authLink, httpLink])
    : ApolloLink.from([errorLink, authLink, httpLink]);

  // hydrate cache with the initialState created server-side
  const cache = new InMemoryCache().restore(ctx.initialState || {});

  if (!isBrowser) authenticate(cache, ctx.headers.cookie);

  return new ApolloClient({
    link,
    cache,
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    typeDefs,
    resolvers
  });
};

export default withApollo(createClient, { getDataFromTree: 'ssr' });
