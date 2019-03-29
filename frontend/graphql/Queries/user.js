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

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
    }
  }
`;
