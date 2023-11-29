import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import createError from 'http-errors';
import Debug from 'debug';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';

import { backendUrl, development, port as portt } from './constants/config.js';
import { corsOptions } from './constants/cors.js';
import prisma from '../prisma/prisma.js';
import router from './rest/routes.js';
import schema from './graphql/schema.js';
// import myLogger from './utils/myLogger.js';
// import path from 'path';

// In production, env vars are defined on the host
// https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// if (!production) require('dotenv').config();

// https://www.apollographql.com/docs/apollo-server/api/express-middleware#example
// https://expressjs.com/en/advanced/best-practice-security.html
// https://expressjs.com/en/advanced/best-practice-performance.html

console.log('corsOptions:', corsOptions);

const debug = Debug('todo:server');

// Normalize a port into a number, string, or false
const normalizePort = val => {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) return val;

  // port number
  if (port >= 0) return port;

  return false;
};

// Get port from environment and store in Express.
const port = normalizePort(portt);

// Required logic for integrating with Express
const app = express();

app.set('port', port);

// Our httpServer handles incoming requests to our Express app
const httpServer = http.createServer(app);

// https://sandbox.apollo.dev/?endpoint=http://localhost:8008/gql
const apolloServer = new ApolloServer({
  schema,

  // subscriptions: { path: '/ws' },

  // Enable server to shut down gracefully
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer })

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

// Ensure we wait for our server to start
await apolloServer.start();

app.use(
  bodyParser.json({ limit: '50mb' }),
  compression(),
  cors(corsOptions),
  express.json(),
  express.urlencoded({ extended: false }),

  // https://docs.nestjs.com/security/helmet
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [
          `'self'`,
          'data:',
          'apollo-server-landing-page.cdn.apollographql.com'
        ],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [
          `'self'`,
          'apollo-server-landing-page.cdn.apollographql.com'
        ],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com']
      }
    }
  })

  // cookieParser(),

  // logger(development ? 'dev' : 'combined'),
  // development ? myLogger : (req, res, next) => next(),
);

app.use(router);

app.use(
  '/gql',

  expressMiddleware(apolloServer, {
    // context: async ({ req }) => ({ token: req.headers.token }),

    context: async ({ req, res }) => {
      // https://www.apollographql.com/docs/apollo-server/security/authentication/
      const accessToken = req?.cookies?.access;

      return { req, res, prisma, accessToken };
    }
  })
);

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

// Event listener for HTTP server "error" event
const onError = error => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
};

const onListening = () => {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  console.log(`🚀 Server ready at ${backendUrl}:` + addr.port);

  debug('Listening on ' + bind);
};

// Modified server startup
await new Promise(resolve => {
  // Listen on provided port, on all network interfaces
  httpServer.listen({ port }, resolve);
  httpServer.on('listening', onListening);
  httpServer.on('error', onError);
});

// -- subscriptions config --

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
