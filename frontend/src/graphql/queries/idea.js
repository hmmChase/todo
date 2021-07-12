import { gql } from '@apollo/client';

export const IDEA = gql`
  query idea($id: ID!) {
    idea(id: $id) {
      id
      content
      author {
        id
      }
    }
  }
`;

export const IDEAS = gql`
  query ideas {
    ideas {
      id
      content
      author {
        id
      }
    }
  }
`;
