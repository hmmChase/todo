import { ApolloClient } from '@apollo/client';
import { useMemo } from 'react';
import merge from 'deepmerge';
import type { IncomingMessage, ServerResponse } from 'http';
import type { NormalizedCacheObject } from '@apollo/client';
// import isEqual from 'lodash.isequal';

import { development, server } from '@/constants/config';
import cache from '@/graphql/cache';
import link from '@/graphql/links';
import typeDefs from '@/graphql/typeDefs';

// https://github.com/apollographql/next-apollo-example
// https://github.com/apollographql/fullstack-tutorial/tree/master/final/client
// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
// https://github.com/vercel/next.js/blob/canary/examples/with-typescript-graphql/lib/apollo.ts

// type ResolverContext = { req?: IncomingMessage; res?: ServerResponse };

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = (context?: ResolverContext) =>
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

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (server) return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props)
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
}
  // Update Apollo client only when the cache value has changed
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
}
