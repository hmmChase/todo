// Whenever this files changes:
// npx prisma generate

import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # ---------- Types ----------

  type Query {
    currentNumber: Int

    # --- User ---

    user(id: ID!): User

    users: [User!]!

    currentUser: User

    # --- Idea ---

    idea(id: ID!): Idea

    ideas: [Idea!]!

    ideasPaginatedOffset(
      """
      Return results after this cursor
      """
      offset: Int!
      """
      Number of nodes per page
      """
      limit: Int!
    ): [Idea!]!

    ideasPaginatedCursor(
      """
      Number of nodes per page
      """
      first: Int!
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String!
    ): IdeaConnection!

    currentUserIdeas: [Idea!]!
  }

  type Mutation {
    # --- User ---

    logIn(input: UserAuthInput!): UserAuthPayload!

    logOut: Boolean!

    signUp(input: UserAuthInput!): UserAuthPayload!

    passResetReq(email: String!): Boolean!

    passReset(resetPassToken: String!, newPassword: String!): UserAuthPayload!

    # --- Idea ---

    createIdea(content: String!): Idea!

    updateIdea(id: ID!, content: String!): Idea!

    # soft delete
    removeIdea(id: ID!): Idea!

    deleteIdea(id: ID!): Idea!
  }

  type Subscription {
    numberIncremented: Int
  }

  type User {
    id: ID!
    email: String!
    role: Role!
    ideas: [Idea!]!
  }

  type Idea {
    id: ID!
    content: String!
    author: User!
  }

  type UserAuthPayload {
    user: User!
  }

  """
  Simple wrapper around our list of ideas that contains a cursor to the last
  item in the list.
  Pass this cursor to the ideas query to fetch results after these.
  """
  type IdeaConnection {
    cursor: String!
    hasMore: Boolean!
    ideas: [Idea!]!
  }

  # ---------- Enums ----------

  enum Role {
    USER
    ADMIN
  }

  # ---------- Inputs ----------

  input UserAuthInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
