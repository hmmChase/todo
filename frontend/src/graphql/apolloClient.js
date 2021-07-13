// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js

import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';

import { BASE_URL } from '../config';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const server = typeof window === 'undefined';

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache({}),

    link: new HttpLink({
      uri: `${BASE_URL}/gql`, // Server URL (must be absolute)

      // Additional fetch() options like `credentials` or `headers`
      credentials: 'include'
    }),

    ssrMode: server
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
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

export const useApollo = pageProps => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];

  const store = useMemo(() => initializeApollo(state), [state]);

  // const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
};
