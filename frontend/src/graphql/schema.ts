// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { IResolvers } from '@graphql-tools';

// import typeDefs from './typeDefs';
// import resolvers from './resolvers';

// // https://www.graphql-tools.com/docs/generate-schema/#makeexecutableschemaoptions

// const development = process.env.NODE_ENV === 'development';

// const schema = makeExecutableSchema({
//   // Type definitions define the "shape" of your data and specify
//   // which ways the data can be fetched from the GraphQL server.
//   typeDefs,

//   // Resolvers define the technique for fetching the types in the schema.
//   resolvers as IResolvers,

//   logger: { log: (e: any) => (development ? console.log(e) : null) },
//   allowUndefinedInResolve: !development
// });

// export default schema;
