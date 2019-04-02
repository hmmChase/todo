import gql from 'graphql-tag';

export const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      email
    }
  }
`;
