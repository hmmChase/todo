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

export default withApollo(
  ({ ctx, headers, initialState }) => {
    console.log('withApollo', new Date().getMilliseconds());

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]:
              Message: ${message},
              Location: ${locations},
              Path: ${path}`
          )
        );
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });

    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers
      });
      return forward(operation);
    });

    const uri =
      process.env.NODE_ENV === 'production'
        ? prodGraphQLEndpoint
        : devGraphQLEndpoint;

    // link to use if batching (default)
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
      errorLink,
      authLink,
      // Using the ability to split links, you can send data to each link
      // depending on what kind of operation is being sent
      split(
        operation => operation.getContext().important === true,
        httpLink, // if the test is true -- debatch
        batchHttpLink // otherwise, batching is fine
      )
    ]);

    const cache = new InMemoryCache().restore(initialState || {});

    return new ApolloClient({
      link,
      cache,
      ssrMode: !process.browser,
      ssrForceFetchDelay: 100,
      connectToDevTools: process.browser
    });
  },
  {
    getDataFromTree: 'ssr'
  }
);
