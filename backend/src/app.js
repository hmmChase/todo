/*

https://expressjs.com/en/advanced/best-practice-security.html
https://expressjs.com/en/advanced/best-practice-performance.html

- to fix the error "'babel-node' is not recognized"
https://stackoverflow.com/a/70363444

! must re-build server before pushing to vercel
* npm run build
? and start script

*/

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from 'http';

// import createError from 'http-errors';

// https://github.com/vercel/vercel/discussions/5846
import 'ts-tiny-invariant';

// In production, env vars are defined on the host
if (!production) require('dotenv').config();

import apolloServer from './graphql/apolloServer';
import indexRouter from './rest/routes';
import { port, graphqlPath, deployedUrl } from './constants/config';
import { corsOptions } from './constants/cors';

import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import schema from './graphql/schema';

const production = process.env.NODE_ENV === 'production';

const app = express();

export const httpServer = http.createServer(app);

// https://www.apollographql.com/docs/apollo-server/data/subscriptions/
// https://github.com/apollographql/docs-examples/tree/main/apollo-server/v3/subscriptions
export const subscriptionServer = SubscriptionServer.create(
  { schema, execute, subscribe },

  { server: httpServer, path: apolloServer.graphqlPath }
);

app.use(cors(corsOptions));
// https://github.com/graphql/graphql-playground/issues/1283
app.use(helmet({ contentSecurityPolicy: production ? undefined : false }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger(production ? 'combined' : 'dev'));

app.use('/', indexRouter);

// // catch 404 and forward to error handler
// app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return the error
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});

// https://www.apollographql.com/docs/apollo-server/api/apollo-server/#start
(async () => {
  try {
    await apolloServer.start();

    apolloServer.applyMiddleware({ app, path: graphqlPath, cors: corsOptions });
  } catch (error) {
    console.error('An error occurred while starting Apollo Server: ', error);

    process.exit(1);
  }
})();

// ./bin/www.js not working on vercel
(async () => {
  try {
    let server;

    const hostname = deployedUrl || 'localhost';

    await new Promise(
      resolve => (server = httpServer.listen(port, hostname, resolve))
    );

    const address = await server.address();

    const protocol = production ? 'https' : 'http';

    const serverUrl = `${protocol}://${address.address}:${port}`;

    console.log('🚀 Server ready at', serverUrl);
    console.log(
      `🚀 Query endpoint ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${port}${apolloServer.requestOptions.subscriptions.path}`
    );
  } catch (error) {
    console.error('An error occurred while starting the server: ', error);

    process.exit(1);
  }
})();

export default app;
