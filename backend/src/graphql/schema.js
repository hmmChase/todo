import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    name: Name
  }

  type Name {
    id: ID!
    name: String!
  }
`;

export default typeDefs;
