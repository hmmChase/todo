import gql from 'graphql-tag';
// import { gql } from '@apollo/client';

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

export const CREATE_IDEA = gql`
  mutation createIdea($content: String!) {
    createIdea(content: $content) {
      id
      content
      author {
        id
      }
    }
  }
`;

export const UPDATE_IDEA = gql`
  mutation updateIdea($id: ID!, $content: String!) {
    updateIdea(id: $id, content: $content) {
      id
      content
    }
  }
`;

export const DELETE_IDEA = gql`
  mutation deleteIdea($id: ID!) {
    deleteIdea(id: $id) {
      id
    }
  }
`;

export const IDEAS_CONNECTION = gql`
  query ideasConnection {
    ideasConnection {
      aggregate {
        count
      }
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        cursor
      }
    }
  }
`;

export const CURRENT_USER_IDEA = gql`
  query currentUserIdea($id: ID!) {
    currentUserIdea(id: $id) {
      id
      content
      author {
        id
      }
    }
  }
`;

export const CURRENT_USER_IDEAS = gql`
  query currentUserIdeas {
    currentUserIdeas {
      id
      content
    }
  }
`;

export const CURRENT_USER_PAGINATED_IDEAS = gql`
  query currentUserPaginatedIdeas($first: Int, $after: String) {
    currentUserPaginatedIdeas(
      orderBy: createdAt_DESC
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          content
          author {
            id
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
