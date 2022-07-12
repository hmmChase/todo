import { gql } from '@apollo/client';

//! If you change something, also update mocks

//* - Fragments ----------

export const IDEA_FIELDS = gql`
  fragment IdeaFields on Idea {
    id
    createdAt
    content
  }
`;

export const IDEA_AUTHOR_FIELDS = gql`
  fragment IdeaAuthorFields on Idea {
    ...IdeaFields
    author {
      id
    }
  }
  ${IDEA_FIELDS}
`;

//* - Queries ----------

export const READ_IDEA = gql`
  query ReadIdea($id: ID!) {
    idea(id: $id) {
      ...IdeaAuthorFields
    }
  }
  ${IDEA_AUTHOR_FIELDS}
`;

export const READ_IDEAS = gql`
  query ReadIdeas {
    ideas {
      ...IdeaAuthorFields
    }
  }
  ${IDEA_AUTHOR_FIELDS}
`;

export const READ_IDEAS_CLIENT = gql`
  query ReadIdeasClient {
    ideas @client {
      ...IdeaAuthorFields
    }
  }
  ${IDEA_AUTHOR_FIELDS}
`;

export const READ_IDEAS_PAGINATED_OFFSET = gql`
  query ReadIdeasPaginatedOffset($offset: Int!, $limit: Int!) {
    ideasPaginatedOffset(offset: $offset, limit: $limit) {
      ...IdeaAuthorFields
    }
  }
  ${IDEA_AUTHOR_FIELDS}
`;

export const READ_IDEAS_PAGINATED_CURSOR = gql`
  query ReadIdeasPaginatedCursor($after: String, $pageSize: Int!) {
    ideasPaginatedCursor(after: $after, pageSize: $pageSize) {
      cursor
      hasMore
      ideas {
        ...IdeaAuthorFields
      }
    }
  }
  ${IDEA_AUTHOR_FIELDS}
`;

export const CURRENT_USER_IDEAS = gql`
  query CurrentUserIdeas {
    currentUserIdeas {
      ...IdeaAuthorFields
    }
  }
  ${IDEA_AUTHOR_FIELDS}
`;

//* - Mutations ----------

export const CREATE_IDEA = gql`
  mutation CreateIdea($content: String!) {
    createIdea(content: $content) {
      ...IdeaFields
    }
  }
  ${IDEA_FIELDS}
`;

export const UPDATE_IDEA = gql`
  mutation UpdateIdea($id: ID!, $content: String!) {
    updateIdea(id: $id, content: $content) {
      ...IdeaFields
    }
  }
  ${IDEA_FIELDS}
`;

export const REMOVE_IDEA = gql`
  mutation RemoveIdea($id: ID!) {
    removeIdea(id: $id) {
      id
    }
  }
`;

export const DELETE_IDEA = gql`
  mutation DeleteIdea($id: ID!) {
    deleteIdea(id: $id) {
      id
    }
  }
`;
