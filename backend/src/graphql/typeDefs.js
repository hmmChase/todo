import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Query {
    user(id: ID!): User

    users: [User!]!

    currentUser: User

    idea(id: ID!): Idea

    ideas: [Idea!]!
  }

  type Mutation {
    logIn(input: UserAuthInput!): UserAuthPayload!

    logOut: Boolean!

    signUp(input: UserAuthInput!): UserAuthPayload!
  }

  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    createdAt: Float!
    updatedAt: Float!
    deletedAt: Float!
    email: String!
    password: String!
    role: Role!
    ideas: [Idea!]
  }

  type Idea {
    id: ID!
    content: String!
    author: User!
  }

  type UserAuthPayload {
    user: User
  }

  input UserAuthInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
