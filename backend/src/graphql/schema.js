import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    users: [User!]!
    currentUser: User

    idea(id: ID!): Idea
    ideas: [Idea!]!
  }

  type Mutation {
    logIn(email: String!, password: String!): LoginResponse!
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
    role: String!
    ideas: [Idea!]
  }

  type Idea {
    id: ID!
    content: String!
    author: User!
  }

  type LoginResponse {
    user: User
  }
`;

export default typeDefs;
