// https://www.apollographql.com/docs/react/caching/overview/
// https://github.com/apollographql/ac3-state-management-examples/tree/master/apollo-local-state

import { InMemoryCache, makeVar } from '@apollo/client';

const serverSide = typeof window === 'undefined';

let isToken = false;

if (!serverSide) isToken = !!localStorage.getItem('token');

export const isLoggedInVar = makeVar(isToken);

const cache = new InMemoryCache({
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
