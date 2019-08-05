import { ApolloServer } from 'apollo-server-express';
import prisma from './prismaClient';
import schema from './schema';

const dev = process.env.NODE_ENV === 'development';

export default () =>
  new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      return { req, res, prisma };
    },
    tracing: false,
    debug: false,
    introspection: dev,
    playground: dev && {
      settings: {
        'editor.theme': 'light',
        'request.credentials': 'include'
      }
    }
  });
