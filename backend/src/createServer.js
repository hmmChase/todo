const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers');
const prisma = require('./prisma');

const { importSchema } = require('graphql-import');
const typeDefs = importSchema('src/schema/schema.graphql');

function createServer() {
  console.log('__dirname: ', __dirname + '/schema/schema.graphql');

  return new GraphQLServer({
    typeDefs: typeDefs,

    // typeDefs: __dirname + '/schema/schema.graphql',
    resolvers,
    context: ({ req, res }) => ({ req, res, prisma })
  });
}

module.exports = createServer;
