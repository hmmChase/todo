import { makeExecutableSchema } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import resolvers from '../resolvers';

const typeDefs = importSchema(__dirname + '/schema.graphql');

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
