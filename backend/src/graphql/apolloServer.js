import { ApolloServer } from 'apollo-server-express';

import prisma from '../prisma/prisma';
import schema from './schema';

const server = () => {
  const development = process.env.NODE_ENV === 'development';

  return new ApolloServer({
    schema,

    context: async ({ req, res }) => {
      let accessToken = req.cookies.at;

      return { req, res, prisma, accessToken };
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
