// https://www.apollographql.com/docs/react/caching/overview/
// https://github.com/apollographql/ac3-state-management-examples/tree/master/apollo-local-state

import { makeVar } from '@apollo/client';
import { InMemoryCache, defaultDataIdFromObject } from '@apollo/client/cache';

const serverSide = typeof window === 'undefined';

let isLoggedInVar = makeVar(false);

if (!serverSide && window.document)
  isLoggedInVar = makeVar(!!localStorage.getItem('token'));

export { isLoggedInVar };

const cache = new InMemoryCache({
  // resultCaching: true,
  // freezeResults: true,

  // dataIdFromObject(object) {
  //   switch (object.__typename) {
  //     case 'Idea':
  //       return `${object.__typename}:${object.slug}`;
  //     case 'User':
  //       return `${object.__typename}:${object.email}`;
  //     default:
  //       return defaultDataIdFromObject(object);
  //   }
  // },

  // cacheRedirects: {
  //   Query: {
  //     articleBySlug(_root, args, context) {
  //       return context.getCacheKey({ __typename: 'Article', slug: args.slug });
  //     },

  //     comment(_root, args, context) {
  //       return context.getCacheKey({ __typename: 'Comment', id: args.id });
  //     },

  //     userByEmail(_root, args, context) {
  //       return context.getCacheKey({
  //         __typename: 'User',
  //         username: args.email
  //       });
  //     }
  //   }
  // },

  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          }
        }

        // ideas: {
        //   keyArgs: false,

        //   merge(existing, incoming) {
        //     let ideas = [];

        //     if (existing && existing.ideas)
        //       ideas = ideas.concat(existing.ideas);

        //     if (incoming && incoming.ideas)
        //       ideas = ideas.concat(incoming.ideas);

        //     return { ...incoming, ideas };
        //   }
        // }
      }
    }
  }
});

export default cache;
