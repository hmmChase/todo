import { ApolloServer } from 'apollo-server-express';
import prisma from './prisma/prismaClient';
import * as auth from './utils/auth';
import schema from './schema';

const dev = process.env.NODE_ENV !== 'production';

export default () =>
  new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const me = await auth.getMe(req);

      return { req, res, prisma, me };
    },
    tracing: false,
    introspection: dev,
    debug: dev,
    playground: dev
      ? {
          settings: {
            'editor.theme': 'light',
            'request.credentials': 'include'
          }
        }
      : false
  });
