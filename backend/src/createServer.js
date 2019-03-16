import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import path from 'path';
import { prisma } from '../prisma/generated/prisma-client';
import resolvers from './resolvers';
const typeDefs = importSchema(path.resolve('src/schema/schema.graphql'));

// const getMe = async req => {
//   const { token } = req.cookies;

//   if (token) {
//     try {
//       return await jwt.verify(token, process.env.JWT_SECRET);
//     } catch (e) {
//       throw new AuthenticationError('Your session expired. Sign in again.');
//     }
//   }
// };

export default () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      // if (req) {
      //   const me = await getMe(req);
      // }

      return { req, prisma };
    },
    introspection: true,
    playground: true
  });
