import { makeExecutableSchema } from '@graphql-tools/schema';

import resolvers from '../resolvers/index.js';
import typeDefs from './typeDefs.js';
// import { development } from '../constants/config.js';
// import { permissions } from './permissions';

// https://www.apollographql.com/docs/apollo-server/api/apollo-server/#schema
// https://the-guild.dev/graphql/tools/docs/generate-schema

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const schema = makeExecutableSchema({
  // Type definitions define the "shape" of your data and specify
  // which ways the data can be fetched from the GraphQL server
  typeDefs,

  // Resolvers define the technique for fetching the types in the schema
  resolvers

  // logger: { log: e => (development ? console.log(e) : null) },

  // allowUndefinedInResolve: true
});

export default schema;
