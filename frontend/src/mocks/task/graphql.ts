import { mockGQLError } from '@/mocks/mockGQLErrors';
import { task1, tasks } from '@/mocks/task';
import * as taskQuery from '@/graphql/queries/task';

//* - Queries ----------

export const READ_TASK = {
  request: { query: taskQuery.READ_TASK, variables: { id: '1' } },
  result: { data: { task: task1 } }
};

export const READ_TASK_ERROR = {
  request: { query: taskQuery.READ_TASK, variables: { id: '1' } },
  error: mockGQLError
};

//---

export const READ_TASKS = {
  request: { query: taskQuery.READ_TASKS },
  result: { data: { tasks } }
};

export const READ_TASKS_ERROR = {
  request: { query: taskQuery.READ_TASKS },
  error: mockGQLError
};

//---

export const READ_TASKS_CLIENT = {
  request: { query: taskQuery.READ_TASKS_CLIENT },
  result: { data: { tasks } }
};

export const READ_TASKS_CLIENT_ERROR = {
  request: { query: taskQuery.READ_TASKS_CLIENT },
  error: mockGQLError
};

//---

export const READ_TASKS_PAGINATED_OFFSET = {
  request: {
    query: taskQuery.READ_TASKS_PAGINATED_OFFSET,
    variables: { offset: 1, limit: 3 }
  },
  result: { data: { tasksPaginatedOffset: tasks } }
};

export const READ_TASKS_PAGINATED_OFFSET_ERROR = {
  request: {
    query: taskQuery.READ_TASKS_PAGINATED_OFFSET,
    variables: { offset: 1, limit: 3 }
  },
  error: mockGQLError
};

//---

export const READ_TASKS_PAGINATED_CURSOR = {
  request: {
    query: taskQuery.READ_TASKS_PAGINATED_CURSOR,
    variables: { offset: 1, limit: 3 }
  },
  result: { data: { tasksPaginatedCurser: tasks } }
};

export const READ_TASKS_PAGINATED_CURSOR_ERROR = {
  request: {
    query: taskQuery.READ_TASKS_PAGINATED_CURSOR,
    variables: { offset: 1, limit: 3 }
  },
  error: mockGQLError
};

//---

export const CURRENT_USER_TASKS = {
  request: { query: taskQuery.CURRENT_USER_TASKS },
  result: { data: { tasks } }
};

export const CURRENT_USER_TASKS_ERROR = {
  request: { query: taskQuery.CURRENT_USER_TASKS },
  error: mockGQLError
};

//* - Mutations ----------

export const CREATE_TASK = {
  request: {
    query: taskQuery.CREATE_TASK,
    variables: { content: task1.content }
  },
  result: { data: { createTask: task1 } }
};

export const CREATE_TASK_ERROR = {
  request: {
    query: taskQuery.CREATE_TASK,
    variables: { content: 'mock task' }
  },
  error: mockGQLError
};

//---

export const UPDATE_TASK = {
  request: {
    query: taskQuery.UPDATE_TASK,
    variables: { id: '1', content: 'updated mock task' }
  },
  result: {
    data: { updateTask: { id: 1, content: 'updated mock task' } }
  }
};

export const UPDATE_TASK_ERROR = {
  request: {
    query: taskQuery.UPDATE_TASK,
    variables: { id: '1', content: 'updated mock task' }
  },
  error: mockGQLError
};

//---

export const REMOVE_TASK = {
  request: { query: taskQuery.REMOVE_TASK, variables: { id: '1' } },
  result: { data: { removeTask: { id: 1 } } }
};

export const REMOVE_TASK_ERROR = {
  request: { query: taskQuery.REMOVE_TASK, variables: { id: '1' } },
  error: mockGQLError
};

//---

export const DELETE_TASK = {
  request: { query: taskQuery.DELETE_TASK, variables: { id: '1' } },
  result: { data: { deleteTask: { id: 1 } } }
};

export const DELETE_TASK_ERROR = {
  request: { query: taskQuery.DELETE_TASK, variables: { id: '1' } },
  error: mockGQLError
};
