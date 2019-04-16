/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrors.map(err =>
          console.log(
            `[GraphQL error (${operation.operationName})]: Message: ${
              err.message
            }`
          )
        );

        for (const err of graphQLErrors) {
          switch (err.extensions.code) {
            // AuthenticationError
            case 'UNAUTHENTICATED':
              // Modify the operation context with a new token
              // const oldHeaders = operation.getContext().headers;

              // operation.setContext({
              //   headers: {
              //     ...oldHeaders,
              //     authorization: getNewToken()
              //   }
              // });

              // Retry the request, returning the new observable
              return forward(operation);
          }
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);

        // if you would also like to retry automatically on
        // network errors, we recommend that you use
        // apollo-link-retry
      }
    }
  );

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers
    });
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
