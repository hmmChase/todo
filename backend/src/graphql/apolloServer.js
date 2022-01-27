// https://www.apollographql.com/docs/apollo-server/api/apollo-server/

import { ApolloServer } from 'apollo-server-express';

import prisma from '../../prisma/prisma.cjs';
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

  context: async ({ req, res }) => {
    console.log('--------------------------------------------------');
    console.log('server-side? ', !!req.headers['x-server']);
    console.log('cookie: ', req.headers.cookie);
    console.log('operation: ', req.body.operationName);
    console.log('--------------------------------------------------');

    const accessToken = req?.cookies?.at || '';

    return { req, res, prisma, accessToken };
  }
});

export default apolloServer;
