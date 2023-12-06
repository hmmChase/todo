import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import Debug from 'debug';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import logger from 'morgan';
// import cookieParser from 'cookie-parser';
// import createError from 'http-errors';

import { backendUrl, development } from './constants/config.js';
import { corsOptions } from './constants/cors.js';
import prisma from '../prisma/prisma.js';
import router from './routes/routes.js';
import schema from './graphql/schema.js';
// import { backendUrl, port as portt } from './constants/config.js';
import myLogger from './utils/myLogger.js';
// import path from 'path';

// In production, env vars are defined on the host
// https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// if (!production) require('dotenv').config();

// https://www.apollographql.com/docs/apollo-server/api/express-middleware#example
// https://expressjs.com/en/advanced/best-practice-security.html
// https://expressjs.com/en/advanced/best-practice-performance.html

const debug = Debug('todo:server');

// Required logic for integrating with Express
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(compression());
app.use(cors(corsOptions));
app.use(development ? myLogger : (req, res, next) => next());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(
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
);
// app.use(cookieParser());
// logger(development ? 'dev' : 'combined'),

// catch 404 and forward to error handler
// app.use((req, res, next) => next(createError(404)));

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return the error
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});

app.use(router);

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

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');

// Store port in Express
app.set('port', port);

// Event listener for HTTP server "listening" event
function onListening() {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  console.log(`🚀 Server ready at ${backendUrl}:${addr.port}/`);

  debug('Listening on ' + bind);
}

// Listen on provided port, on all network interfaces
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

// --- functions ---

// Normalize a port into a number, string, or false
function normalizePort(val) {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) return val;

  // port number
  if (port >= 0) return port;

  return false;
}

// Event listener for HTTP server "error" event
function onError(error) {
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
}

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
