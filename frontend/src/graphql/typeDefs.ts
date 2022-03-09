// https://www.apollographql.com/docs/tutorial/local-state/

import { gql } from '@apollo/client';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export default typeDefs;
