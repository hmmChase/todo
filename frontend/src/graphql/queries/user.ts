import { gql } from '@apollo/client';

// import { IDEA_AUTHOR_FIELDS } from './idea';

//! If you change something, also update mocks

//* - Fragments ----------

export const USER_FIELDS = gql`
  fragment userFields on User {
    id
    # createdAt
    # email
    role
    # ideas {
    #   ...IdeaAuthorFields
    # }
  }
`;
// ${IDEA_AUTHOR_FIELDS}

//* - Queries ----------

export const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

export const READ_USER = gql`
  query ReadUser($id: ID!) {
    user(id: $id) {
      ...userFields
    }
  }
  ${USER_FIELDS}
`;

export const READ_USERS = gql`
  query ReadUsers {
    users {
      ...userFields
      email
    }
  }
  ${USER_FIELDS}
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      ...userFields
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

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      user {
        ...userFields
      }
    }
  }
  ${USER_FIELDS}
`;

export const PASS_RESET_REQ = gql`
  mutation PassResetReq($email: String!) {
    passResetReq(email: $email)
  }
`;

export const PASS_RESET = gql`
  mutation PassReset($resetPassToken: String!, $newPassword: String!) {
    passReset(resetPassToken: $resetPassToken, newPassword: $newPassword) {
      success
      user {
        ...userFields
      }
    }
  }
  ${USER_FIELDS}
`;
