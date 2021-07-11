/*

! must re-build server before pushing to vercel
? and start script
* npm run build

*/

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';

import { CORSwhitelist } from './config.js';
import apolloServer from './graphql/apolloServer';
import indexRouter from './rest/routes';

const production = process.env.NODE_ENV === 'production';

// in production, env vars are defined on the host
if (!production) require('dotenv').config();

const app = express();

const server = apolloServer();

const corsOptions = { origin: CORSwhitelist, credentials: true };

app.use(cors(corsOptions));
// https://github.com/graphql/graphql-playground/issues/1283
app.use(helmet({ contentSecurityPolicy: production ? undefined : false }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger(production ? 'combined' : 'dev'));

server.applyMiddleware({ app, path: '/gql', cors: corsOptions });

app.use('/', indexRouter);

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

// ./bin/www.js file doesn't work on vercel
if (production) {
  const port = process.env.PORT || '8008';

  app.listen({ port }, err => {
    if (err) throw err;

    console.log('Server ready on port:', port);
  });
}

export default app;
