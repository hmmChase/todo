// https:www.graphql.org/learn/schema/

const typeDefs = `#graphql
  # ---------- Types ----------

  type Query {
    currentNumber: Int

    # --- User ---

    user(id: ID!): User!

    users: [User!]!

    currentUser: User

    # --- Task ---

    task(id: ID!): Task!

    tasks: [Task!]!

    tasksPaginatedOffset(
      """
      Return results after this cursor
      """
      offset: Int!
      """
      Number of nodes per page
      """
      limit: Int!
    ): [Task!]!

    tasksPaginatedCursor(
      """
      Number of nodes per page (first)
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): TaskConnection!

    currentUserTasks: [Task!]!
  }

  type Mutation {
    # --- User ---

    logIn(input: UserAuthInput!): User!

    logOut: Boolean!

    signUp(input: UserAuthInput!): User!

    passResetReq(email: String!): Boolean!

    passReset(resetPassToken: String!, newPassword: String!): UserAuthPayload!

    # --- Task ---

    createTask(content: String!): Task!

    updateTask(id: ID!, content: String!): Task!

    # soft delete
    removeTask(id: ID!): Task!

    deleteTask(id: ID!): Task!
  }

  type Subscription {
    numberIncremented: Int
  }

  type User {
    id: ID!
    email: String!
    role: Role!
    # tasks: [Task!]!
  }

  type Task {
    id: ID!
    createdAt: String!
    content: String!
    due: String!
    author: User!
  }

  type UserAuthPayload {
    success: Boolean!
    user: User!
  }

  """
  Simple wrapper around our list of tasks that contains a cursor to the last
  item in the list.
  Pass this cursor to the tasks query to fetch results after these.
  """
  type TaskConnection {
    cursor: String!
    hasMore: Boolean!
    tasks: [Task!]!
  }

  # ---------- Enums ----------

  enum Role {
    ADMIN
    USER
  }

  # ---------- Inputs ----------

  input UserAuthInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
