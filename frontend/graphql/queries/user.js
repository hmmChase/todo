import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IS_LOGGED_IN {
    isLoggedIn @client
  }
`;

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
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

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
      user {
        id
      }
    }
  }
`;

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut
  }
`;

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
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
