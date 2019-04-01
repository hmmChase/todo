/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { devGraphQLEndpoint, prodGraphQLEndpoint } from '../config';

export default withApollo(
  ({ ctx, headers, initialState }) => {
    // const errorLink = onError(({ graphQLErrors, networkError }) => {
    //   if (graphQLErrors)
    //     graphQLErrors.map(({ message, locations, path }) =>
    //       console.log(
    //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    //       )
    //     );
    //   if (networkError) {
    //     console.log(`[Network error]: ${networkError}`);
    //   }
    // });

    // const authLink = new ApolloLink((operation, forward) => {
    //   operation.setContext({
    //     headers
    //   });
    //   return forward(operation);
    // });

    const httpLink = createHttpLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? prodGraphQLEndpoint
          : devGraphQLEndpoint
      // credentials: 'same-origin',
      // credentials: 'include',
    });

    console.log('withApollo', new Date().getMilliseconds());

    return new ApolloClient({
      link: httpLink,
      // link: ApolloLink.from([errorLink, authLink, httpLink]),
      cache: new InMemoryCache().restore(initialState || {}),
      ssrMode: !process.browser,
      ssrForceFetchDelay: 100,
      connectToDevTools: process.browser
    });
  },
  {
    getDataFromTree: 'ssr'
  }
);
