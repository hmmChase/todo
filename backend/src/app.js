/*

! must re-build server before pushing to vercel
? and start script
* npm run build

*/

import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

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
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
