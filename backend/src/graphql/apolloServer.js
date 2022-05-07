// https://www.apollographql.com/docs/apollo-server/api/apollo-server/

// Apollo Sandbox:
// https://sandbox.apollo.dev/?endpoint=http://localhost:8008/gql

import { ApolloServer } from 'apollo-server-express';

// import { development } from '../constants/config.js';
import prisma from '../../prisma/prisma.js';
import schema from './schema.js';

// import { subscriptionServer } from '../app';

const apolloServer = new ApolloServer({
  schema,

  // subscriptions: { path: '/ws' },

  // plugins: [
  //   {
  //     async serverWillStart() {
  //       return {
  //         async drainServer() {
  //           subscriptionServer.close();
  //         }
  //       };
  //     }
  //   }
  // ],

  // introspection: development,

  // debug: development,

  context: async ({ req, res }) => {
    // https://www.apollographql.com/docs/apollo-server/security/authentication/
    const accessToken = req?.cookies?.access;

    return { req, res, prisma, accessToken };
  }
});

export default apolloServer;
