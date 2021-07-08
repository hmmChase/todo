import { gql } from '@apollo/client';

export const GET_NAME = gql`
  query name {
    name {
      name
    }
  }
`;
