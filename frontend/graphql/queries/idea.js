import gql from 'graphql-tag';

export const CREATE_IDEA = gql`
  mutation CREATE_IDEA($content: String!) {
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
  mutation UPDATE_IDEA($id: ID!, $content: String!) {
    updateIdea(id: $id, content: $content) {
      id
      content
    }
  }
`;

export const DELETE_IDEA = gql`
  mutation DELETE_IDEA($id: ID!) {
    deleteIdea(id: $id) {
      id
    }
  }
`;

export const IDEAS_CONNECTION = gql`
  query IDEAS_CONNECTION {
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
  query CURRENT_USER_IDEA($id: ID!) {
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
  query CURRENT_USER_IDEAS {
    currentUserIdeas {
      id
      content
    }
  }
`;

export const CURRENT_USER_PAGINATED_IDEAS = gql`
  query CURRENT_USER_PAGINATED_IDEAS($first: Int, $after: String) {
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
