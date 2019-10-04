import gql from 'graphql-tag';

// Please note that the term "ClientState"
// refers to the ApolloClient. In oder to fully render
// a react application we need the state on the server
// and on the client. Otherwise our react components
// might throw because they can't reach specified values
// in the Schema.
// Therefor the @client targets the react app as a whole (Server&Client).

export const typeDefs = gql`
  extend type Query {
    renderedOn: String!
    isLoggedIn: Boolean!
  }

  #  extend type Mutation {
  # }

  extend type User {
    color: String!
  }
`;
