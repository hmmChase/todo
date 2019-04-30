/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Router from 'next/router';
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';

const createClient = ({ ctx, headers, initialState }) => {
  console.log('withApollo', new Date().getMilliseconds());

  const consoleLink = new ApolloLink((operation, forward) => {
    // console.log('ctx.req.headers: ', ctx.req.headers);

    // console.log('headers: ', headers);

    console.log(
      '\n',
      `---------- starting request for ${operation.operationName}`,
      `(client: ${process.browser}, server: ${!process.browser})`
    );

    return forward(operation).map(op => {
      console.log(`${operation.operationName} res data: `, op.data);
      console.log(
        '\n',
        `---------- ending request for ${operation.operationName}`
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
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          switch (err.extensions.code) {
            // AuthenticationError
            case 'UNAUTHENTICATED':
              console.log('UNAUTHENTICATED: ', {
                operation: operation.operationName,
                message: err.message
              });

              // return forward(operation);
              break;

            // ForbiddenError
            case 'FORBIDDEN':
              console.log('FORBIDDEN: ', {
                operation: operation.operationName,
                message: err.message
              });

              if (process.browser) Router.push('/');

              // return forward(operation);
              break;

            default:
              console.log({
                code: err.extensions.code,
                operation: operation.operationName,
                message: err.message
              });

              // return forward(operation);
              break;
          }
        }
      }

      // ----------------------------------------

      // If error is due to unathenticated user request
      // and a refresh token is available
      // const { extensions } = graphQLErrors[0];
      // const refreshToken = getTokens()['x-token-refresh'];

      // if (extensions.code === 'UNAUTHENTICATED' && refreshToken) {
      //   // Create a new Observerable
      //   return new Observable(async observer => {
      //     // Refresh the access token
      //     refreshAccessToken(refreshToken, client)
      //       // On successful refresh...
      //       .then(newTokens => {
      //         // Handle cookies
      //         if (!newTokens.token) {
      //           // Delete cookies if no new access token provided
      //           destroyCookie(ctx, 'x-token');
      //           destroyCookie(ctx, 'x-token-refresh');
      //         } else {
      //           // Update cookies if new access token available
      //           setCookie(ctx, 'x-token', newTokens.token, {
      //             maxAge: 30 * 60
      //           });

      //           setCookie(ctx, 'x-token-refresh', newTokens.refreshToken, {
      //             maxAge: 30 * 24 * 60 * 60
      //           });
      //         }

      //         // Bind observable subscribers
      //         const subscriber = {
      //           next: observer.next.bind(observer),
      //           error: observer.error.bind(observer),
      //           complete: observer.complete.bind(observer)
      //         };

      //         // Retry last failed request
      //         forward(operation).subscribe(subscriber);
      //       })

      //       // On refresh failure...
      //       .catch(error => {
      //         observer.error(error);
      //       });
      //   });
      // }

      // ----------------------------------------

      // for (const err of graphQLErrors) {
      //   switch (err.extensions.code) {
      //     // AuthenticationError
      //     case 'UNAUTHENTICATED':
      //       // Modify the operation context with a new token
      //       // const oldHeaders = operation.getContext().headers;

      //       // operation.setContext({
      //       //   headers: {
      //       //     ...oldHeaders,
      //       //     authorization: getNewToken()
      //       //   }
      //       // });

      //       // Retry the request, returning the new observable
      //       return forward(operation);

      //     // ----------------------------------------

      //     // const doRefresh = async () => {
      //     //   const refreshToken = await getTokens()['x-token-refresh'];
      //     //   const data = await refreshAuthToken(refreshToken);

      //     //   console.log('.......................');
      //     //   console.log('results of refreshAuthToken (success!!)');
      //     //   console.log(data.data.refreshAuthToken.token);
      //     //   console.log('.......................');

      //     //   await cookie.serialize(
      //     //     'x-token-new',
      //     //     data.data.refreshAuthToken.token,
      //     //     {}
      //     //   );

      //     //   await operation.setContext({
      //     //     headers: {
      //     //       ...headers,
      //     //       'x-token': data.data.refreshAuthToken.token
      //     //     }
      //     //   });

      // return forward(operation);
      //     // };

      //     // doRefresh();
      //   }
      // }

      if (networkError) {
        const errorObject = {
          code: networkError.code,
          message: networkError.message
        };

        console.log('[Network error]: ', errorObject);

        // if you would also like to retry automatically on
        // network errors, we recommend that you use
        // apollo-link-retry
      }
    }
  );

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({ headers });

    return forward(operation);
  });

  const uri =
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_GRAPHQL_ENDPOINT
      : process.env.DEV_GRAPHQL_ENDPOINT;

  // Link to use if batching (default)
  // Also adds a `batch: true` header to the request
  // to prove it's a different link
  const batchHttpLink = new BatchHttpLink({
    uri,
    credentials: 'include',
    headers: { batch: 'true ' }
  });

  // link to use if not batching
  const httpLink = createHttpLink({
    uri,
    credentials: 'include'
  });

  const link = ApolloLink.from([
    consoleLink,
    errorLink,
    authLink,
    // Using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    split(
      // Add `debatch: true` to the operation's context to debatch it
      // <Query query={SOME_QUERY} context={{ debatch: true }}>
      operation => operation.getContext().debatch === true,
      httpLink, // if the test is true -- debatch
      batchHttpLink // otherwise, batching is fine
    )
  ]);

  const cache = new InMemoryCache().restore(initialState || {});

  return new ApolloClient({
    link,
    cache,
    queryDeduplication: true,
    ssrMode: !process.browser,
    ssrForceFetchDelay: 100,
    connectToDevTools: process.browser
  });
};

export default withApollo(createClient, {
  getDataFromTree: 'ssr'
});
