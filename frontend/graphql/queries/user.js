import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IS_LOGGED_IN {
    isLoggedIn @client
  }
`;

export const CURRENT_USER = gql`
  query CURRENT_USER {
    currentUser {
      id
      email
      ideas {
        id
        content
      }
      color @client
    }
  }
`;

export const USERS = gql`
  query USERS {
    users {
      id
      email
    }
  }
`;

export const SIGN_UP = gql`
  mutation SIGN_UP(
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
  mutation SIGN_IN($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
      user {
        id
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SIGN_OUT {
    signOut
  }
`;

export const REQUEST_RESET = gql`
  mutation REQUEST_RESET($email: String!) {
    requestReset(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
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
