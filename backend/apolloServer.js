import { ApolloServer } from 'apollo-server-express';
import prisma from './prismaClient';
import schema from './schema';

export default () =>
  new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      let accessToken = '';

      if (req && req.headers && req.headers.authorization)
        accessToken = req.headers.authorization.replace('Bearer ', '');

      return { req, res, prisma, accessToken };
    },
    tracing: process.env.NODE_ENV === 'development',
    debug: process.env.NODE_ENV === 'development',
    introspection: process.env.NODE_ENV === 'development',
    playground: process.env.NODE_ENV === 'development' && {
      settings: { 'editor.theme': 'light', 'request.credentials': 'include' }
    }
  });
