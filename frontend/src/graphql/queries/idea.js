import { gql } from '@apollo/client';

//* - Fragments ----------

export const IDEA_FIELDS = gql`
  fragment IdeaFields on Idea {
    id
    content
  }
`;

export const IDEA_AUTHOR_FIELDS = gql`
  fragment IdeaAuthorFields on Idea {
    id
    content
    author {
      id
    }
  }
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
  query ReadIdeasPaginatedOffset($offset: Int, $limit: Int) {
    ideasPaginatedOffset(offset: $offset, limit: $limit) {
      ...IdeaAuthorFields
    }
  }
  ${IDEA_AUTHOR_FIELDS}
`;

export const READ_IDEAS_PAGINATED_CURSER = gql`
  query ReadIdeasCurserPaginated($after: String) {
    readIdeasPaginatedCurser(take: $take, skip: $skip) {
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
      ...IdeaFields
    }
  }
  ${IDEA_FIELDS}
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
