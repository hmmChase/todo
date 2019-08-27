import gql from 'graphql-tag';

export const CREATE_IDEA_MUTATION = gql`
  mutation CREATE_IDEA_MUTATION($content: String!) {
    createIdea(content: $content) {
      id
      content
      author {
        id
      }
    }
  }
`;

export const UPDATE_IDEA_MUTATION = gql`
  mutation UPDATE_IDEA_MUTATION($id: ID!, $content: String!) {
    updateIdea(id: $id, content: $content) {
      id
      content
    }
  }
`;

export const DELETE_IDEA_MUTATION = gql`
  mutation DELETE_IDEA_MUTATION($id: ID!) {
    deleteIdea(id: $id) {
      id
    }
  }
`;

export const IDEAS_CONNECTION_QUERY = gql`
  query IDEAS_CONNECTION_QUERY {
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
