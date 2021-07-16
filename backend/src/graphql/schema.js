import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

// https://www.graphql-tools.com/docs/generate-schema/#makeexecutableschemaoptions

const development = process.env.NODE_ENV === 'development';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  // logger: development && { log: e => console.log(e) },
  // allowUndefinedInResolve: !development
});

export default schema;
