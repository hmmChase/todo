const { Prisma } = require('prisma-binding');

const prisma = new Prisma({
  typeDefs: __dirname + '/schema/schema_prep.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET
});

module.exports = prisma;
