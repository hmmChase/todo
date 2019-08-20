import gql from 'graphql-tag';

export const CREATE_IDEA_MUTATION = gql`
  mutation CREATE_IDEA_MUTATION($content: String!) {
    createIdea(content: $content) {
      id
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
