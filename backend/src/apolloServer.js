import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
const prisma = require('./prismaClient');
import resolvers from './resolvers';
import * as auth from './utils/auth';

import schema from './schema';

const typeDefs = importSchema(__dirname + '/schema/schema.graphql');

const dev = process.env.NODE_ENV !== 'production';

export default () =>
  new ApolloServer({
    // typeDefs,
    // resolvers,
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
