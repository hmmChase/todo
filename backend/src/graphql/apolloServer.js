import { ApolloServer } from 'apollo-server-express';

import prisma from '../prisma/prisma';
import typeDefs from './schema';
import { resolvers } from './resolvers/name';

const server = () => {
  const development = process.env.NODE_ENV === 'development';

  return new ApolloServer({
    typeDefs,
    resolvers,

    context: async ({ req, res }) => {
      return { req, res, prisma };
    },

    tracing: development,
    debug: development,
    introspection: development,
    playground: development && {
      settings: { 'editor.theme': 'light', 'request.credentials': 'include' }
    }
  });
};

export default server;
