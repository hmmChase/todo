import { ApolloServer } from 'apollo-server-express';

import prisma from '../prisma/prisma';
import typeDefs from './schema';
import resolvers from './resolvers';

const server = () => {
  const development = process.env.NODE_ENV === 'development';

  return new ApolloServer({
    typeDefs,
    resolvers,

    context: async ({ req, res }) => {
      let accessToken;

      if (req && req.cookies && req.cookies.at) accessToken = req.cookies.at;

      console.log('req.cookies.at:', req.cookies.at);

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
