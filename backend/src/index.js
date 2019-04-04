import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import apolloServer from './apolloServer';

const app = express();
const server = apolloServer();

// const whitelist = [
//   'http://localhost:8008',
//   'https://next-graphql-starter-git-master.hmmchase.now.sh'
// ];
const corsOptions = {
  credentials: true,
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_FRONTEND_URL
      : process.env.DEV_FRONTEND_URL
  // origin: (origin, callback) => {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // }
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());

server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

app.listen({ port: process.env.PORT || 4000 }, err => {
  if (err) throw err;
  console.log(
    `Apollo Server ready at http://localhost:${process.env.PORT}${
      server.graphqlPath
    }`
  );
});
