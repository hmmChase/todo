import { ApolloClient } from '@apollo/client';
import { development, server } from '@/constants/config';
import { useMemo } from 'react';
import cache from '@/graphql/cache';
import isEqual from 'lodash.isequal';
import link from '@/graphql/links';
import merge from 'deepmerge';
import type { IncomingMessage, ServerResponse } from 'http';
import type { NormalizedCacheObject } from '@apollo/client';
// import typeDefs from '@/graphql/typeDefs';

// https://github.com/apollographql/fullstack-tutorial/tree/master/final/client
// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
// https://github.com/vercel/next.js/blob/canary/examples/with-typescript-graphql/lib/apollo.ts

type ResolverContext = { req?: IncomingMessage; res?: ServerResponse };

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = (context?: ResolverContext) =>
  new ApolloClient({
    cache,

    link,

    // typeDefs,

    // headers: { authorization: localStorage.getItem('at') || '' },

    ssrMode: server,

    // https://www.apollographql.com/docs/react/performance/server-side-rendering/#store-rehydration
    ssrForceFetchDelay: 100,

    connectToDevTools: development
  });

export const initializeApollo = (
  initialState: any = null,

  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: ResolverContext
) => {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps
    // in the existing cache
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

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) => {
  if (pageProps?.props)
    pageProps.props['__APOLLO_STATE__'] = client.cache.extract();

  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps['__APOLLO_STATE__'];

  // Update Apollo client only when the cache value has changed
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
};
