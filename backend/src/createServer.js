import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';
import path from 'path';
import { prisma } from '../prisma/generated/prisma-client';
import resolvers from './resolvers';
const typeDefs = importSchema(path.resolve('src/schema/schema.graphql'));

const getMe = async cookies => {
  const { token } = cookies;
  console.log(' : ---------------');
  console.log(' : createServer -> token', token);
  console.log(' : ---------------');

  if (token) {
    try {
      const verified = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(' : -------------------');
      console.log(' : verified', verified);
      console.log(' : -------------------');
      return verified;
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

export default () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: async ctx => {
      let me;
      if (ctx.req.cookies) {
        me = await getMe(ctx.req.cookies);
        console.log(' : ---------');
        console.log(' : me', me);
        console.log(' : ---------');
      }

      return { ...ctx, prisma, me };
    },
    introspection: true,
    playground: true
  });
