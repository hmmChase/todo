import 'dotenv/config';
import express from 'express';
import createServer from './createServer';

const app = express();
const server = createServer();

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, err => {
  if (err) throw err;
  console.log(
    `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
});
