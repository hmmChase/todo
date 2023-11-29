import { makeExecutableSchema } from '@graphql-tools/schema';

import { dateScalar } from './scalars.js';
import taskResolver from '../resolvers/taskResolver.js';
import typeDefs from './typeDefs.js';
import userResolver from '../resolvers/userResolver.js';
// import { development } from '../constants/config.js';
// import { permissions } from './permissions';

// https://www.apollographql.com/docs/apollo-server/api/apollo-server/#schema
// https://the-guild.dev/graphql/tools/docs/generate-schema

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const schema = makeExecutableSchema({
  typeDefs,

  resolvers: [{ Date: dateScalar }, taskResolver, userResolver]

  // logger: { log: e => (development ? console.log(e) : null) },

  // allowUndefinedInResolve: true
});

export default schema;
