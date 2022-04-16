// https://github.com/apollographql/fullstack-tutorial/tree/master/final/client
// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
// https://github.com/vercel/next.js/blob/canary/examples/with-typescript-graphql/lib/apollo.ts

import { useMemo } from 'react';
import { IncomingMessage, ServerResponse } from 'http';
import {
  ApolloClient,
  from,
  HttpLink,
  NormalizedCacheObject
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import isEqual from 'lodash.isequal';
import merge from 'deepmerge';

import { backendUrl, development, server } from '../constants/config';
import cache from './cache';
import typeDefs from './typeDefs';

type ResolverContext = { req?: IncomingMessage; res?: ServerResponse };

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(error => {
  const { graphQLErrors, networkError, operation, response } = error;

  // console.log('operation: ', JSON.stringify(operation, null, 4));
  // console.log('response: ', JSON.stringify(response, null, 4));

  if (graphQLErrors)
    graphQLErrors.forEach(graphQLError => {
      const { extensions, message, path } = graphQLError;

      console.log(
        '%c[GraphQL error]:',
        'background: #222; color: #bada55',
        `${extensions.code}`,
        '\n',
        `Path: ${path}`,
        '\n',
        `Message: ${message}`
      );
    });

  if (networkError) {
    const { name, message, stack } = networkError;

    console.log(
      '[Network error]:',
      'background: #222; color: #bada55',
      `${name}`,
      '\n',
      `Message: ${message}`
    );
  }
});

const httpLink = new HttpLink({
  uri: `${backendUrl}/gql`,

  credentials: 'include'
});

const link = development ? from([errorLink, httpLink]) : from([httpLink]);

const createApolloClient = (context?: ResolverContext) =>
  new ApolloClient({
    link,

    cache,

    typeDefs,

    // headers: { authorization: localStorage.getItem('at') || '' },

    ssrMode: server,

    // https://www.apollographql.com/docs/react/performance/server-side-rendering/#store-rehydration
    ssrForceFetchDelay: 100,

    connectToDevTools: process.env.NODE_ENV === 'development'
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
