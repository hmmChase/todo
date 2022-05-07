import { makeExecutableSchema } from '@graphql-tools/schema';

// import { development } from '../constants/config.js';
import resolvers from './resolvers/index.js';
import typeDefs from './typeDefs.js';

// import { permissions } from './permissions';

// https://www.graphql-tools.com/docs/generate-schema/#makeexecutableschemaoptions

const executableSchema = makeExecutableSchema({
  // Type definitions define the "shape" of your data and specify
  // which ways the data can be fetched from the GraphQL server
  typeDefs,

  // Resolvers define the technique for fetching the types in the schema
  resolvers

  // logger: { log: e => (development ? console.log(e) : null) },

  // allowUndefinedInResolve: true
});

export default executableSchema;
