import { ApolloClient } from '@apollo/client';
import { useRef } from 'react';
import isEqual from 'lodash.isequal';
import merge from 'deepmerge';
import type { NormalizedCacheObject } from '@apollo/client';
// import type { IncomingMessage, ServerResponse } from 'http';

import { development, server } from '@/constants/config';
import cache from '@/graphql/cache';
import link from '@/graphql/links';
// import typeDefs from '@/graphql/typeDefs';

// https://github.com/apollographql/next-apollo-example
// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
// https://github.com/vercel/next.js/blob/canary/examples/with-typescript-graphql/lib/apollo.ts

// type ResolverContext = { req?: IncomingMessage; res?: ServerResponse };

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

// (context?: ResolverContext)
const createApolloClient = () =>
  new ApolloClient({
    cache,

    link,

    // typeDefs,

    ssrMode: server,

    // https://www.apollographql.com/docs/react/performance/server-side-rendering/#store-rehydration
    // https://www.apollographql.com/docs/react/performance/server-side-rendering#overriding-fetch-policies-during-initialization
    // ssrForceFetchDelay: 100,

    connectToDevTools: development
  });

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
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

export const addApolloState = (client: any, pageProps: any) => {
  if (pageProps?.props)
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];

  const storeRef: any = useRef();

  // Update Apollo client only when the cache value has changed
  if (!storeRef.current) storeRef.current = initializeApollo(state);

  return storeRef.current;
};
