import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    users: [User!]!
    idea(id: ID!): Idea
    ideas: [Idea!]!
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

  enum Role {
    USER
    ADMIN
  }
`;

export default typeDefs;
