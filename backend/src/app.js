// https://expressjs.com/en/advanced/best-practice-security.html
// https://expressjs.com/en/advanced/best-practice-performance.html

// In production, env vars are defined on the host
// https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// if (!production) require('dotenv').config();
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
// import logger from 'morgan';
// import http from 'http';
// import createError from 'http-errors';

import { corsOptions } from './constants/cors.js';
// import { development, graphqlPath } from './constants/config.js';
import {
  development,
  graphqlPath,
  preview,
  production,
  deployedUrl,
  frontendUrl
} from './constants/config.js';
import apolloServer from './graphql/apolloServer.js';
import myLogger from './utils/myLogger.js';
import router from './rest/routes.js';
// import { port, deployedUrl } from './constants/config.js';

// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { execute, subscribe } from 'graphql.js';
// import schema from './graphql/schema.js';

const app = express();

console.log('preview:', preview);
console.log('production:', production);
console.log('deployedUrl:', deployedUrl);
console.log('frontendUrl:', frontendUrl);

// export const httpServer = http.createServer(app);

// // https://www.apollographql.com/docs/apollo-server/data/subscriptions/
// // https://github.com/apollographql/docs-examples/tree/main/apollo-server/v3/subscriptions
// export const subscriptionServer = SubscriptionServer.create(
//   { schema, execute, subscribe },

//   { server: httpServer, path: apolloServer.graphqlPath }
// );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// app.use(logger(development ? 'dev' : 'combined'));
app.use(development ? myLogger : (req, res, next) => next());

app.use(router);

// // catch 404 and forward to error handler
// app.use((req, res, next) => next(createError(404)));

// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // return the error
//   res.status(err.status || 500);
//   res.json({ message: err.message, error: err });
// });

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

// (async () => {
//   try {
//     let server;

//     const hostname = deployedUrl || 'localhost';

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

export default app;
