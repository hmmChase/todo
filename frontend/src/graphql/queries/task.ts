import { gql } from '@apollo/client';

//! If you change something, also update mocks

//* - Fragments ----------

export const TASK_FIELDS = gql`
  fragment TaskFields on Task {
    id
    createdAt
    content
    dueBy
  }
`;

export const TASK_AUTHOR_FIELDS = gql`
  fragment TaskAuthorFields on Task {
    ...TaskFields
    author {
      id
    }
  }
  ${TASK_FIELDS}
`;

//* - Queries ----------

export const READ_TASK = gql`
  query ReadTask($id: ID!) {
    task(id: $id) {
      ...TaskAuthorFields
    }
  }
  ${TASK_AUTHOR_FIELDS}
`;

export const READ_TASKS = gql`
  query ReadTasks {
    tasks {
      ...TaskAuthorFields
    }
  }
  ${TASK_AUTHOR_FIELDS}
`;

export const READ_TASKS_CLIENT = gql`
  query ReadTasksClient {
    tasks @client {
      ...TaskAuthorFields
    }
  }
  ${TASK_AUTHOR_FIELDS}
`;

export const READ_TASKS_PAGINATED_OFFSET = gql`
  query ReadTasksPaginatedOffset($offset: Int!, $limit: Int!) {
    tasksPaginatedOffset(offset: $offset, limit: $limit) {
      ...TaskAuthorFields
    }
  }
  ${TASK_AUTHOR_FIELDS}
`;

export const READ_TASKS_PAGINATED_CURSOR = gql`
  query ReadTasksPaginatedCursor($after: String, $pageSize: Int!) {
    tasksPaginatedCursor(after: $after, pageSize: $pageSize) {
      cursor
      hasMore
      tasks {
        ...TaskAuthorFields
      }
    }
  }
  ${TASK_AUTHOR_FIELDS}
`;

export const CURRENT_USER_TASKS = gql`
  query CurrentUserTasks {
    currentUserTasks {
      ...TaskAuthorFields
    }
  }
  ${TASK_AUTHOR_FIELDS}
`;

//* - Mutations ----------

export const CREATE_TASK = gql`
  mutation CreateTask($content: String!, $dueBy: Date!) {
    createTask(content: $content, dueBy: $dueBy) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $content: String!) {
    updateTask(id: $id, content: $content) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`;

export const REMOVE_TASK = gql`
  mutation RemoveTask($id: ID!) {
    removeTask(id: $id) {
      id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
