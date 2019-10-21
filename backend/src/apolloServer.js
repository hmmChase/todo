import { ApolloServer } from 'apollo-server-express';
import prisma from './prismaClient';
import schema from './schema';

const dev = process.env.NODE_ENV === 'development';

export default () =>
  new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      console.log('context req cookie: ', req.headers.cookie);
      console.log('context req server: ', req.headers.server);
      console.log('context req authorization: ', req.headers.authorization);

      let accessToken = '';

      if (req && req.headers && req.headers.authorization) {
        accessToken = req.headers.authorization.replace('Bearer ', '');
      }

      return { req, res, prisma, accessToken };
    },
    tracing: false,
    debug: false,
    introspection: dev,
    playground: dev && {
      settings: { 'editor.theme': 'light', 'request.credentials': 'include' }
    }
  });
