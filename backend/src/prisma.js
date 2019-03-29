// This file connects to the remote prisma DB and gives us the ability to query it with JS
const { Prisma } = require('prisma-binding');

const prisma = new Prisma({
  typeDefs: __dirname + '/schema/generated/schema_prep.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET
});

module.exports = prisma;
