import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;

export const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`;

export const USERS = gql`
  query users {
    users {
      id
      email
    }
  }
`;

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      email
    }
  }
`;

// login(input: { email: $email, password: $password }) {

export const LOG_IN = gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;
