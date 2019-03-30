const { Prisma } = require('prisma-binding');
const { importSchema } = require('graphql-import');
const typeDefs = importSchema(__dirname + '/schema/generated/prisma.graphql');

const prisma = new Prisma({
  typeDefs,
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET
});

module.exports = prisma;
