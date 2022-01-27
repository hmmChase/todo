// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js

import { useMemo } from 'react';
import { ApolloClient, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash.isequal';

// import { concatPagination } from '@apollo/client/utilities';

import { backendUrl } from '../constants/config';
import cache from './cache';
import typeDefs from './typeDefs';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const server = typeof window === 'undefined';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: `${backendUrl}/gql`,

  credentials: 'include'
});

const link = from([errorLink, httpLink]);

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: server,

    link,

    cache,

    typeDefs,

    // headers: { authorization: localStorage.getItem('at') || '' },

    connectToDevTools: process.env.NODE_ENV === 'development'
  });

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,

        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s)))
      ]
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (server) return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (client, pageProps) => {
  if (pageProps?.props)
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
};

export const useApollo = pageProps => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];

  // Update Apollo client only when the cache value has changed
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
};
