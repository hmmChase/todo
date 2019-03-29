require('dotenv').config();
const createServer = require('./createServer');

const server = createServer();

server.start(
  {
    port: '6969',
    endpoint: '/graphql',
    playground: '/graphql',
    tracing: true,
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  server => {
    console.log(
      `Server is now running on port http://localhost:${server.port}${
        server.endpoint
      }`
    );
  }
);
