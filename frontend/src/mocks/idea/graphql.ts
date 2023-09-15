import { idea1, ideas } from '@/mocks/idea';
import { mockGQLError } from '@/mocks/mockGQLErrors';
import * as ideaQuery from '@/graphql/queries/idea';

//* - Queries ----------

export const READ_IDEA = {
  request: { query: ideaQuery.READ_IDEA, variables: { id: '1' } },
  result: { data: { idea: idea1 } }
};

export const READ_IDEA_ERROR = {
  request: { query: ideaQuery.READ_IDEA, variables: { id: '1' } },
  error: mockGQLError
};

//---

export const READ_IDEAS = {
  request: { query: ideaQuery.READ_IDEAS },
  result: { data: { ideas } }
};

export const READ_IDEAS_ERROR = {
  request: { query: ideaQuery.READ_IDEAS },
  error: mockGQLError
};

//---

export const READ_IDEAS_CLIENT = {
  request: { query: ideaQuery.READ_IDEAS_CLIENT },
  result: { data: { ideas } }
};

export const READ_IDEAS_CLIENT_ERROR = {
  request: { query: ideaQuery.READ_IDEAS_CLIENT },
  error: mockGQLError
};

//---

export const READ_IDEAS_PAGINATED_OFFSET = {
  request: {
    query: ideaQuery.READ_IDEAS_PAGINATED_OFFSET,
    variables: { offset: 1, limit: 3 }
  },
  result: { data: { ideasPaginatedOffset: ideas } }
};

export const READ_IDEAS_PAGINATED_OFFSET_ERROR = {
  request: {
    query: ideaQuery.READ_IDEAS_PAGINATED_OFFSET,
    variables: { offset: 1, limit: 3 }
  },
  error: mockGQLError
};

//---

export const READ_IDEAS_PAGINATED_CURSOR = {
  request: {
    query: ideaQuery.READ_IDEAS_PAGINATED_CURSOR,
    variables: { offset: 1, limit: 3 }
  },
  result: { data: { ideasPaginatedCurser: ideas } }
};

export const READ_IDEAS_PAGINATED_CURSOR_ERROR = {
  request: {
    query: ideaQuery.READ_IDEAS_PAGINATED_CURSOR,
    variables: { offset: 1, limit: 3 }
  },
  error: mockGQLError
};

//---

export const CURRENT_USER_IDEAS = {
  request: { query: ideaQuery.CURRENT_USER_IDEAS },
  result: { data: { ideas } }
};

export const CURRENT_USER_IDEAS_ERROR = {
  request: { query: ideaQuery.CURRENT_USER_IDEAS },
  error: mockGQLError
};

//* - Mutations ----------

export const CREATE_IDEA = {
  request: {
    query: ideaQuery.CREATE_IDEA,
    variables: { content: idea1.content }
  },
  result: { data: { createIdea: idea1 } }
};

export const CREATE_IDEA_ERROR = {
  request: {
    query: ideaQuery.CREATE_IDEA,
    variables: { content: 'mock idea' }
  },
  error: mockGQLError
};

//---

export const UPDATE_IDEA = {
  request: {
    query: ideaQuery.UPDATE_IDEA,
    variables: { id: '1', content: 'updated mock idea' }
  },
  result: {
    data: { updateIdea: { id: 1, content: 'updated mock idea' } }
  }
};

export const UPDATE_IDEA_ERROR = {
  request: {
    query: ideaQuery.UPDATE_IDEA,
    variables: { id: '1', content: 'updated mock idea' }
  },
  error: mockGQLError
};

//---

export const REMOVE_IDEA = {
  request: { query: ideaQuery.REMOVE_IDEA, variables: { id: '1' } },
  result: { data: { removeIdea: { id: 1 } } }
};

export const REMOVE_IDEA_ERROR = {
  request: { query: ideaQuery.REMOVE_IDEA, variables: { id: '1' } },
  error: mockGQLError
};

//---

export const DELETE_IDEA = {
  request: { query: ideaQuery.DELETE_IDEA, variables: { id: '1' } },
  result: { data: { deleteIdea: { id: 1 } } }
};

export const DELETE_IDEA_ERROR = {
  request: { query: ideaQuery.DELETE_IDEA, variables: { id: '1' } },
  error: mockGQLError
};
