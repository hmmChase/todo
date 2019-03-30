const { Prisma } = require('prisma-binding');

const { importSchema } = require('graphql-import');

const typeDefs = importSchema(__dirname + '/schema/generated/prisma.graphql');
// const typeDefs = importSchema(__dirname + '/schema/schema_prep.graphql');
console.log('TCL: typeDefs', typeDefs);

const prisma = new Prisma({
  // typeDefs: __dirname + '/schema/schema_prep.graphql',
  typeDefs,

  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET
});

module.exports = prisma;
