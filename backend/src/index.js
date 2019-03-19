import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import createServer from './createServer';

const app = express();
const server = createServer();

const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log(' : -----------');
//   console.log(' : index.req.cookies', req.cookies);
//   console.log(' : -----------');
//   const { token } = req.cookies;
//   console.log(' : ---------------');
//   console.log(' : index.token', token);
//   console.log(' : ---------------');
//   if (token) {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     req.me = user;
//   }
//   next();
// });

server.applyMiddleware({ app, path: '/', cors: corsOptions });

app.listen({ port: process.env.PORT || 4000 }, err => {
  if (err) throw err;
  console.log(
    `Apollo Server ready at http://localhost:${process.env.PORT}${
      server.graphqlPath
    }`
  );
});
