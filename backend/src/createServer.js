const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers');
const prisma = require('./prisma');

function createServer() {
  return new GraphQLServer({
    typeDefs: __dirname + '/schema/schema.graphql',
    resolvers,
    context: ({ req, res }) => ({ req, res, prisma })
  });
}


module.exports = createServer;
