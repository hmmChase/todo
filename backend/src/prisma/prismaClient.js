import { Prisma } from 'prisma-binding';

const path = require('path');
console.log('/ = %s', path.resolve('/'));
console.log('. = %s', path.resolve('.'));
console.log('backend = %s', path.resolve('backend'));
console.log('/backend = %s', path.resolve('/backend'));
console.log('__dirname = %s', path.resolve(__dirname));

const prisma = new Prisma({
  // typeDefs: 'src/schema/generated/prisma.graphql',
  typeDefs: 'src/schema/generated/prisma.graphql',
  // typeDefs: '/src/schema/schema_prep.graphql',
  // typeDefs: __dirname + '/schema/generated/prisma.graphql',
  // typeDefs: __dirname + '/schema/schema_prep.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET
});

export default prisma;
