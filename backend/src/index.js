require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');

const server = createServer();

server.start(
  {
    port: 6969,
    endpoint: '/graphql',
    playground: '/graphql',
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
