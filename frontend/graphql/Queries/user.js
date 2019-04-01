import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
    }
  }
`;

export const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      email
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`;

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
    }
  }
`;
