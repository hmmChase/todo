import gql from 'graphql-tag';
// import { gql } from '@apollo/client';

export default gql`
  extend type Query {
    # renderedOn: String!
    isLoggedIn: Boolean!
  }

  # extend type Mutation {
  # }

  # extend type User {
  #   color: String!
  # }
`;
