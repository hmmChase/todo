// https://www.apollographql.com/docs/apollo-server/api/express-middleware#example
// https://expressjs.com/en/advanced/best-practice-security.html
// https://expressjs.com/en/advanced/best-practice-performance.html

// In production, env vars are defined on the host
// https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// if (!production) require('dotenv').config();
import 'dotenv/config';

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import helmet from 'helmet';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import logger from 'morgan';

import { corsOptions } from './constants/cors.js';
import prisma from '../prisma/prisma.js';
import { backendUrl, development } from './constants/config.js';
import myLogger from './utils/myLogger.js';
import router from './rest/routes.js';
import schema from './graphql/schema.js';
// import apolloServer from './graphql/apolloServer.js';

// Required logic for integrating with Express
const app = express();

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

//-apolloServer.js------------------------------------------------

const apolloServer = new ApolloServer({
  schema,

  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

//--------------------------------------------------------------

// Ensure we wait for our server to start
await apolloServer.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',

  express.json(),
  express.urlencoded({ extended: false }),
  helmet(),
  compression(),
  cookieParser(),
  cors(corsOptions),
  bodyParser.json(),

  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(apolloServer, {
    // context: async ({ req }) => ({ token: req.headers.token }),

    context: async ({ req, res }) => {
      // https://www.apollographql.com/docs/apollo-server/security/authentication/
      const accessToken = req?.cookies?.access;

      return { req, res, prisma, accessToken };
    }
  })
);

// app.use(logger(development ? 'dev' : 'combined'));
app.use(development ? myLogger : (req, res, next) => next());

app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return the error
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});

// // Modified server startup
// await new Promise(resolve => httpServer.listen({ port }, resolve));

console.log(`🚀 Server ready at ${backendUrl}`);

export default app;

// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { execute, subscribe } from 'graphql.js';

// // https://www.apollographql.com/docs/apollo-server/data/subscriptions/
// // https://github.com/apollographql/docs-examples/tree/main/apollo-server/v3/subscriptions
// export const subscriptionServer = SubscriptionServer.create(
//   { schema, execute, subscribe },

//   { server: httpServer, path: apolloServer.graphqlPath }
// );

// // https://www.apollographql.com/docs/apollo-server/api/apollo-server/#start
// (async () => {
//   try {
//     await apolloServer.start();

//     apolloServer.applyMiddleware({ app, path: graphqlPath, cors: corsOptions });
//   } catch (error) {
//     console.error('An error occurred while starting Apollo Server: ', error);

//     process.exit(1);
//   }
// })();

// (async () => {
//   try {
//     let server;

//     const hostname = backendUrl || 'localhost';

//     await new Promise(
//       resolve => (server = httpServer.listen(port, hostname, resolve))
//     );

//     const address = await server.address();

//     const protocol = production ? 'https' : 'http';

//     const serverUrl = `${protocol}://${address.address}:${port}`;

//     console.log('🚀 Server ready at', serverUrl);
//     console.log(
//       `🚀 Query endpoint ready at http://localhost:${port}${apolloServer.graphqlPath}`
//     );
//     console.log(
//       `🚀 Subscription endpoint ready at ws://localhost:${port}${apolloServer.requestOptions.subscriptions.path}`
//     );
//   } catch (error) {
//     console.error('An error occurred while starting the server: ', error);

//     process.exit(1);
//   }
// })();
