import gql from 'graphql-tag';

export const GET_ME_QUERY = gql`
  {
    me {
      id
      email
    }
  }
`;
