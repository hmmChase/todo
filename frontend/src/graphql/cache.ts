// https://www.apollographql.com/docs/react/caching/overview/
// https://github.com/apollographql/ac3-state-management-examples/tree/master/apollo-local-state

import { makeVar } from '@apollo/client';
import {
  InMemoryCache,
  Reference,
  defaultDataIdFromObject
} from '@apollo/client/cache';
// import { concatPagination } from '@apollo/client/utilities';

// const serverSide = typeof window === 'undefined';

let isLoggedInVar = makeVar<boolean>(false);

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          }
        }

        // allIdeas: concatPagination(),
        // ideas: {
        //   keyArgs: false,
        //   merge(existing, incoming) {
        //     let ideas: Reference[] = [];
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

// const cache = new InMemoryCache({
//   // resultCaching: true,
//   // freezeResults: true,

//   // dataIdFromObject(object) {
//   //   switch (object.__typename) {
//   //     case 'Idea':
//   //       return `${object.__typename}:${object.slug}`;
//   //     case 'User':
//   //       return `${object.__typename}:${object.email}`;
//   //     default:
//   //       return defaultDataIdFromObject(object);
//   //   }
//   // },

//   // cacheRedirects: {
//   //   Query: {
//   //     articleBySlug(_root, args, context) {
//   //       return context.getCacheKey({ __typename: 'Article', slug: args.slug });
//   //     },

//   //     comment(_root, args, context) {
//   //       return context.getCacheKey({ __typename: 'Comment', id: args.id });
//   //     },

//   //     userByEmail(_root, args, context) {
//   //       return context.getCacheKey({
//   //         __typename: 'User',
//   //         username: args.email
//   //       });
//   //     }
//   //   }
//   // },
// });

export { isLoggedInVar };

export default cache;
