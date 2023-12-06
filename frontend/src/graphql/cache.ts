import { InMemoryCache } from '@apollo/client/cache';
import { makeVar } from '@apollo/client';
// import { concatPagination } from '@apollo/client/utilities';
// import { defaultDataIdFromObject } from '@apollo/client/cache';

// import { Task } from '@/models/index';

// https://www.apollographql.com/docs/react/caching/overview/
// https://github.com/apollographql/ac3-state-management-examples/tree/master/apollo-local-state

export let isLoggedInVar = makeVar<boolean>(false);

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          }
        }

        // https://www.apollographql.com/docs/react/pagination/core-api/
        // tasks: concatPagination(['tasksPaginatedOffset']),

        // tasksPaginatedOffset: {
        //   keyArgs: false,

        //   merge(existing: { tasks: Task[] }, incoming: { tasks: Task[] }) {
        //     let tasks: Task[] = [];

        //     console.log('existing:', existing);
        //     if (existing && existing.tasks)
        //       tasks = tasks.concat(existing.tasks);

        //     if (incoming && incoming.tasks)
        //       tasks = tasks.concat(incoming.tasks);

        //     return { ...incoming, tasks };
        //   }
        // },

        // tasksPaginatedCursor: {
        //   keyArgs: false,

        //   merge(existing: { tasks: Task[] }, incoming: { tasks: Task[] }) {
        //     let tasks: Task[] = [];

        //     if (existing && existing.tasks)
        //       tasks = tasks.concat(existing.tasks);

        //     if (incoming && incoming.tasks)
        //       tasks = tasks.concat(incoming.tasks);

        //     return { ...incoming, tasks };
        //   }
        // }
      }
    }
  }
});

// const cache = new InMemoryCache({
//   resultCaching: true,
//   freezeResults: true,

//   dataIdFromObject(object) {
//     switch (object.__typename) {
//       case 'Task':
//         return `${object.__typename}:${object.slug}`;
//       case 'User':
//         return `${object.__typename}:${object.email}`;
//       default:
//         return defaultDataIdFromObject(object);
//     }
//   },

//   cacheRedirects: {
//     Query: {
//       articleBySlug(_root, args, context) {
//         return context.getCacheKey({ __typename: 'Article', slug: args.slug });
//       },

//       comment(_root, args, context) {
//         return context.getCacheKey({ __typename: 'Comment', id: args.id });
//       },

//       userByEmail(_root, args, context) {
//         return context.getCacheKey({
//           __typename: 'User',
//           username: args.email
//         });
//       }
//     }
//   }
// });

export default cache;
