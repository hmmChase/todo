import { gql } from '@apollo/client';

export const READ_IDEA = gql`
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

export const READ_IDEAS = gql`
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

export const CREATE_IDEA = gql`
  mutation AddIdea($content: String!) {
    addIdea(content: $content) {
      id
      content
    }
  }
`;

export const UPDATE_IDEA = gql`
  mutation UpdateIdea($id: String!, $content: String!) {
    updateIdea(id: $id, content: $content) {
      id
      content
    }
  }
`;
