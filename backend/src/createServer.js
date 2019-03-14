import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import path from 'path';
import { prisma } from '../prisma/generated/prisma-client';
import resolvers from './resolvers';
const typeDefs = importSchema(path.resolve('src/schema/schema.graphql'));

export default () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: req => ({
      ...req,
      prisma
    }),
    introspection: true,
    playground: true
  });
