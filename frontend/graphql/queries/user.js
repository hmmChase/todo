import gql from 'graphql-tag';
// import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      username
      email
      ideas {
        id
        content
      }
      # color @client
    }
  }
`;
export const USERS = gql`
  query users {
    users {
      id
      username
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      accessToken
      user {
        id
        username
        email
        ideas {
          id
          content
        }
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      accessToken
      user {
        id
        username
        email
        ideas {
          id
          content
        }
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signOut {
    signOut
  }
`;

export const REQUEST_RESET = gql`
  mutation requestReset($email: String!) {
    requestReset(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;
