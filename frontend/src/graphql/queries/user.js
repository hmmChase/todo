import { gql } from '@apollo/client';

//* - Fragments ----------

export const USER_FIELDS = gql`
  fragment userFields on Comment {
    idd
    email
  }
`;

//* - Queries ----------

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const READ_USER = gql`
  ${USER_FIELDS}

  query User($id: ID!) {
    user(id: $id) {
      ...userFields
    }
  }
`;

export const READ_USERS = gql`
  ${USER_FIELDS}

  query Users {
    users {
      ...userFields
    }
  }
`;

export const CURRENT_USER = gql`
  ${USER_FIELDS}

  query CurrentUser {
    currentUser {
      ...userFields
    }
  }
`;

//* - Mutations ----------

export const LOG_IN = gql`
  ${USER_FIELDS}

  mutation LogIn($email: String!, $password: String!) {
    logIn(input: { email: $email, password: $password }) {
      user {
        ...userFields
      }
    }
  }
`;

export const LOG_OUT = gql`
  ${USER_FIELDS}

  mutation LogOut {
    logOut
  }
`;

export const CREATE_USER = gql`
  ${USER_FIELDS}

  mutation CreateUser($email: String!, $password: String!) {
    createUser(input: { email: $email, password: $password }) {
      user {
        ...userFields
      }
    }
  }
`;
