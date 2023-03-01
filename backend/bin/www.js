#!/usr/bin/env node

/**
 * Module dependencies.
 */

import Debug from 'debug';
import http from 'http';

import app from '../src/app.js';
import { port as portt } from '../src/constants/config.js';

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('process.env.VERCEL_URL:', process.env.VERCEL_URL);
console.log('process.env.VERCEL_ENV:', process.env.VERCEL_ENV);

const debug = Debug('hmmStart:server');

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = val => {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) return val;

  // port number
  if (port >= 0) return port;

  return false;
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(portt);

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

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

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  console.log('Listening on http://localhost:' + addr.port);

  debug('Listening on ' + bind);
};

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
