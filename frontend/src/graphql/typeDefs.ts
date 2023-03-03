import { gql } from '@apollo/client';

// https://www.apollographql.com/docs/tutorial/local-state/

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export default typeDefs;
