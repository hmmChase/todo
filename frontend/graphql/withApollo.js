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
import { devGraphQLEndpoint, prodGraphQLEndpoint } from '../config';

const createClient = ({ ctx, headers, initialState }) => {
  console.log('withApollo', new Date().getMilliseconds());

  const errorLink = () =>
    onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        console.log('TCL: createClient -> graphQLErrors', graphQLErrors);

        for (const err of graphQLErrors) {
          switch (err.extensions.code) {
            case 'UNAUTHENTICATED':
              console.log(
                'TCL: createClient -> err.extensions.code',
                err.extensions.code
              );

            // error code is set to UNAUTHENTICATED
            // when AuthenticationError thrown in resolver

            // modify the operation context with a new token
            // const oldHeaders = operation.getContext().headers;

            // operation.setContext({
            //   headers: {
            //     ...oldHeaders,
            //     authorization: getNewToken()
            //   }
            // });

            // retry the request, returning the new observable
            // return forward(operation);
          }
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);

        // if you would also like to retry automatically on
        // network errors, we recommend that you use
        // apollo-link-retry
      }
    });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers
    });
    return forward(operation);
  });

  // const authLinkv2 = setContext((_, { headers }) => {
  //   const token = getAuthToken();
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : ''
  //     }
  //   };
  // });

  const uri =
    process.env.NODE_ENV === 'production'
      ? prodGraphQLEndpoint
      : devGraphQLEndpoint;

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
    // errorLink,
    authLink,
    // Using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    split(
      // Add `important: true` to the operation's context to debatch it
      // <Query query={SOME_QUERY} context={{ important: true }}>
      operation => operation.getContext().important === true,
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
