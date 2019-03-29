require('dotenv').config();
const createServer = require('./createServer');

const server = createServer();

server.start(
  {
    port: 6969,
    endpoint: '/graphql',
    playground: '/graphql',
    tracing: true
  },
  server => {
    console.log(
      `Apollo Server ready at http://localhost:${server.port}${server.endpoint}`
    );
  }
);
