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
      email
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      accessToken
      user {
        id
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
      user {
        id
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
