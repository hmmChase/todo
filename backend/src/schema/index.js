require('dotenv').config({ path: './.env' });
import { makeExecutableSchema } from 'apollo-server-express';
import { importSchema } from 'graphql-import';

const typeDefs = importSchema(__dirname + '/schema.graphql');

// const typeDefs = importSchema('./src/schema/schema.graphql');
import resolvers from '../resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
