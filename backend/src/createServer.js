const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers');
const prisma = require('./prisma');

const { importSchema } = require('graphql-import');
const typeDefs = importSchema(__dirname + '/schema/schema.graphql');

function createServer() {
  return new GraphQLServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, prisma })
  });
}

module.exports = createServer;
