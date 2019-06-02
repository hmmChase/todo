import { ApolloServer } from 'apollo-server-express';
import * as auth from './utils/auth';
import prisma from './prisma/prismaClient';
import schema from './schema';

// import { importSchema } from 'graphql-import';
// import resolvers from './resolvers';
// const typeDefs = importSchema(__dirname + '/schema/schema.graphql');

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
