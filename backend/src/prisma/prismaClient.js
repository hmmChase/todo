import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  // typeDefs: './src/schema/schema_prep.graphql',
  // typeDefs: 'src/schema/generated/prisma.graphql',
  // typeDefs: __dirname + '/schema/generated/prisma.graphql',
  typeDefs: __dirname + '/schema/schema_prep.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET
});

export default prisma;
