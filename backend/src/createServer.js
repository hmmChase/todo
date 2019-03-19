import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';
import path from 'path';
import { prisma } from '../prisma/generated/prisma-client';
import resolvers from './resolvers';
const typeDefs = importSchema(path.resolve('src/schema/schema.graphql'));

const getMe = async cookies => {
  const { token } = cookies;

  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

export default () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      const me = await getMe(req.cookies);

      return { req, res, prisma, me };
    },
    tracing: process.env.NODE_ENV === 'development',
    introspection: process.env.NODE_ENV === 'development',
    playground:
      process.env.NODE_ENV === 'development'
        ? {
            settings: {
              'editor.theme': 'light',
              'request.credentials': 'include'
            }
          }
        : false
  });
