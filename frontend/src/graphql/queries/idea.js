import { gql } from '@apollo/client';

//* - Fragments ----------

export const IDEA_FIELDS = gql`
  fragment IdeaFields on Idea {
    id
    content
    author {
      id
    }
  }
`;

//* - Queries ----------

export const READ_IDEA = gql`
  ${IDEA_FIELDS}

  query ReadIdea($id: ID!) {
    idea(id: $id) {
      ...IdeaFields
    }
  }
`;

export const READ_IDEAS = gql`
  ${IDEA_FIELDS}

  query ReadIdeas {
    ideas {
      ...IdeaFields
    }
  }
`;

export const READ_IDEAS_CLIENT = gql`
  ${IDEA_FIELDS}

  query ReadIdeasClient {
    ideas @client {
      ...IdeaFields
    }
  }
`;

export const READ_IDEAS_PAGINATED_OFFSET = gql`
  ${IDEA_FIELDS}

  query ReadIdeasPaginatedOffset($offset: Int, $limit: Int) {
    ideasPaginatedOffset(offset: $offset, limit: $limit) {
      ...IdeaFields
    }
  }
`;

export const READ_IDEAS_PAGINATED_CURSER = gql`
  ${IDEA_FIELDS}

  query ReadIdeasCurserPaginated($after: String) {
    ideasPaginatedCurser(after: $after) {
      cursor
      hasMore
      ideas {
        ...IdeaFields
      }
    }
  }
`;

// export const CURRENT_USER_CURSER_PAGINATED_IDEAS = gql`
//   query CurrentUserCurserPaginatedIdeas($take: Int, $skip: String) {
//     currentUserCurserPaginatedIdeas(
//       orderBy: createdAt_DESC
//       take: $take
//       skip: $skip
//     ) {
//       edges {
//         node {
//           id
//           content
//           author {
//             id
//           }
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//     }
//   }
// `;

//* - Mutations ----------

export const CREATE_IDEA = gql`
  mutation CreateIdea($content: String!) {
    createIdea(content: $content) {
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
