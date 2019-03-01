require('dotenv').config();
const createServer = require('./createServer');

const server = createServer();

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
