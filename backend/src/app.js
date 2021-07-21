/*

https://expressjs.com/en/advanced/best-practice-security.html
https://expressjs.com/en/advanced/best-practice-performance.html

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
// import createError from 'http-errors';

import 'ts-tiny-invariant';

// In production, env vars are defined on the host
if (!production) require('dotenv').config();

import apolloServer from './graphql/apolloServer';
import indexRouter from './rest/routes';
import { port, corsOptions, graphqlPath, deployedUrl } from './config.js';

const production = process.env.NODE_ENV === 'production';

const app = express();

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
if (production)
  (async () => {
    try {
      let httpServer;

      const hostname = deployedUrl || 'localhost';

      await new Promise(
        resolve => (httpServer = app.listen(port, hostname, resolve))
      );

      const address = await httpServer.address();

      const protocol = production ? 'https' : 'http';

      const serverUrl = `${protocol}://${address.address}:${port}${apolloServer.graphqlPath}`;

      console.log('🚀 Server ready at', serverUrl);
    } catch (error) {
      console.error('An error occurred while starting the server: ', error);

      process.exit(1);
    }
  })();

export default app;
