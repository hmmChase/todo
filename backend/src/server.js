import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
// import bodyParser from 'body-parser';
// import compression from 'compression';
// import cors from 'cors';
// import createError from 'http-errors';
import Debug from 'debug';
import express from 'express';
// import helmet from 'helmet';
import http from 'http';
import logger from 'morgan';
// import cookieParser from 'cookie-parser';

// import { backendUrl, development, port as portt } from './constants/config.js';
// import { corsOptions } from './constants/cors.js';
import prisma from '../prisma/prisma.js';
import router from './routes/routes.js';
import schema from './graphql/schema.js';
// import myLogger from './utils/myLogger.js';
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

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

// Event listener for HTTP server "listening" event
function onListening() {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
