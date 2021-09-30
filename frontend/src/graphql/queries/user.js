import { gql } from '@apollo/client';

//! If you change something, also update mocks

//* - Fragments ----------

export const USER_FIELDS = gql`
  fragment userFields on User {
    id
    email
    role
  }
`;

//* - Queries ----------

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const READ_USER = gql`
  query ReadUser($id: ID!) {
    readUser(id: $id) {
      user {
        ...userFields
      }
    }
  }
  ${USER_FIELDS}
`;

export const READ_USERS = gql`
  query Users {
    users {
      user {
        ...userFields
      }
    }
  }
  ${USER_FIELDS}
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      user {
        ...userFields
      }
    }
  }
  ${USER_FIELDS}
`;

//* - Mutations ----------

export const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(input: { email: $email, password: $password }) {
      user {
        ...userFields
      }
    }
  }
  ${USER_FIELDS}
`;

export const LOG_OUT = gql`
  mutation LogOut {
    logOut
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(input: { email: $email, password: $password }) {
      user {
        ...userFields
      }
    }
  }
  ${USER_FIELDS}
`;

export const REQ_PASS_RESET = gql`
  mutation ReqPassReset($email: String!) {
    reqPassReset(email: $email)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($resetPassToken: String!, $newPassword: String!) {
    changePassword(resetPassToken: $resetPassToken, newPassword: $newPassword) {
      user {
        ...userFields
      }
    }
  }
  ${USER_FIELDS}
`;
