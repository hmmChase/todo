import { makeExecutableSchema } from '@graphql-tools/schema';
// import { applyMiddleware } from 'graphql-middleware';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
// import { permissions } from './permissions';

// https://www.graphql-tools.com/docs/generate-schema/#makeexecutableschemaoptions

const development = process.env.NODE_ENV === 'development';

const executableSchema = makeExecutableSchema({
  // Type definitions define the "shape" of your data and specify
  // which ways the data can be fetched from the GraphQL server.
  typeDefs,

  // Resolvers define the technique for fetching the types in the schema.
  resolvers,

  logger: { log: e => (development ? console.log(e) : null) },
  allowUndefinedInResolve: !development
});

// const schema = applyMiddleware(executableSchema, permissions);

export default executableSchema;
