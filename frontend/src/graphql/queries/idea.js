import { gql } from '@apollo/client';

export const IDEAS = gql`
  query ideas {
    ideas {
      id
      content
    }
  }
`;
