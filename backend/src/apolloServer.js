import { ApolloServer } from 'apollo-server-express';
import prisma from './prismaClient';
import { getCurrentUser } from './utils/auth';
import schema from './schema';

const dev = process.env.NODE_ENV === 'development';

export default () =>
  new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const currentUser = await getCurrentUser(req.cookies.token);

      return { req, res, prisma, currentUser };
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
