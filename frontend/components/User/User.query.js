import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      email
    }
  }
`;
