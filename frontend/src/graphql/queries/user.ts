import { gql, TypedDocumentNode } from '@apollo/client';

// import { TASK_AUTHOR_FIELDS } from './task';

//! If you change something, also update mocks

//* - Fragments ----------

export const USER_FIELDS = gql`
  fragment userFields on User {
    # By default, an object's cache key is a combination of its
    # __typename and id fields, so we should always make sure the
    # id is in the response so our data can be normalized and cached properly
    id
    # createdAt
    # email
    role
    # tasks {
    #   ...TaskAuthorFields
    # }
  }
`;
// ${TASK_AUTHOR_FIELDS}

//* - Queries ----------

export const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

interface ReadUserData {
  user: { id: string; role: string };
}

interface ReadUserVars {
  id: string;
}

export const READ_USER: TypedDocumentNode<ReadUserData, ReadUserVars> = gql`
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

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        ...userFields
      }
    }
  }
  ${USER_FIELDS}
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
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
