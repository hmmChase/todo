import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';
import path from 'path';
import { prisma } from '../prisma/generated/prisma-client';
import resolvers from './resolvers';
const typeDefs = importSchema(path.resolve('src/schema/schema.graphql'));

// const getMe = async cookies => {
//   const { token } = cookies;
//   console.log(' : ---------------');
//   console.log(' : createServer -> token', token);
//   console.log(' : ---------------');

//   if (token) {
//     try {
//       const verified = await jwt.verify(token, process.env.JWT_SECRET);
//       console.log(' : -------------------');
//       console.log(' : verified', verified);
//       console.log(' : -------------------');
//       return verified;
//     } catch (e) {
//       throw new AuthenticationError('Your session expired. Sign in again.');
//     }
//   }
// };

export default () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      // console.log(' : -----------');
      // console.log(' : res', Object.keys(res));
      // console.log(' : req', Object.keys(req));

      // console.log(' : res', res);
      // console.log(' : req.userId: ', req.userId);
      // console.log(' : req', req.method);
      // console.log(' : req.headers', req.headers);
      // console.log(' : req.body.query', req.body.query);
      // console.log(' : -----------');
      // const me = await getMe(req.cookies);
      return { req, res, prisma };
    },
    introspection: process.NODE_ENV === 'production' ? false : true,
    playground:
      process.NODE_ENV === 'production'
        ? false
        : {
            settings: {
              'editor.theme': 'light',
              'request.credentials': 'include'
            }
          }
  });
