import gql from 'graphql-tag';

export const ME_QUERY = gql`
  {
    me {
      id
    }
  }
`;

export const USERS_QUERY = gql`
  {
    users {
      id
      email
    }
  }
`;
