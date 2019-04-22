import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
const prisma = require('./prismaClient');
import resolvers from './resolvers';
// import * as auth from './utils/auth';

// const typeDefs = importSchema('src/schema/schema.graphql');
const typeDefs = importSchema(__dirname + '/schema/schema.graphql');

const dev = process.env.NODE_ENV !== 'production';

// const getMe = async req => {
//   const token = req.cookies.token;

//   if (!token) return null;

//   try {
//     return await auth.verifyJWT(req, token);
//   } catch (err) {
//     console.log('getMe err', err);

//     return null;
//   }
// };

export default () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      // const me = await getMe(req);

      return { req, res, prisma };
    },
    // formatError: error => {
    //   delete error.extensions.exception;
    //   return error;
    // },
    tracing: dev,
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
