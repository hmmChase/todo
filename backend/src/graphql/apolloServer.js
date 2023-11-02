import { ApolloServer } from '@apollo/server';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import schema from './schema.js';
// import { development } from '../constants/config.js';
// import { httpServer } from '../app.js';
// import { subscriptionServer } from '../app';

// https://www.apollographql.com/docs/apollo-server/api/apollo-server/

// Apollo Sandbox:
// https://sandbox.apollo.dev/?endpoint=http://localhost:8008/gql

const apolloServer = new ApolloServer({
  schema,

  // subscriptions: { path: '/ws' },

  plugins: [
    // ApolloServerPluginDrainHttpServer({ httpServer })
    // {
    //   async serverWillStart() {
    //     return {
    //       async drainServer() {
    //         subscriptionServer.close();
    //       }
    //     };
    //   }
    // }
  ]

  // introspection: development,

  // debug: development,
});

export default apolloServer;
