import gql from 'graphql-tag';

export default gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  # extend type Mutation {
  # }

  extend type User {
    color: String!
  }
`;
