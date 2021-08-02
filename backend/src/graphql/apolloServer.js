import { ApolloServer } from 'apollo-server-express';

import prisma from '../prisma/prisma';
import schema from './schema';

// https://www.apollographql.com/docs/apollo-server/api/apollo-server/

const apolloServer = new ApolloServer({
  schema,

  context: async ({ req, res }) => {
    const accessToken = (req.cookies && req.cookies.at) || '';

    return { req, res, prisma, accessToken };
  }
});

export default apolloServer;
