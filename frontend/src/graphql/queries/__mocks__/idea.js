import { idea, ideas } from '@/models/index';
import * as ideaQuery from '@/graphql/queries/idea';

//* - Queries ----------

export const READ_IDEA = {
  request: { query: ideaQuery.READ_IDEA, variables: { id: '1' } },
  result: { data: { idea: idea.idea1 } }
};

export const READ_IDEAS = {
  request: { query: ideaQuery.READ_IDEAS },
  result: { data: { ideas: ideas } }
};

export const READ_IDEAS_CLIENT = {
  request: { query: ideaQuery.READ_IDEAS_CLIENT },
  result: { data: { ideas: ideas } }
};

export const READ_IDEAS_PAGINATED_OFFSET = {
  request: {
    query: ideaQuery.READ_IDEAS_PAGINATED_OFFSET,
    variables: { offset: 1, limit: 3 }
  },
  result: { data: { ideasPaginatedOffset: ideas } }
};

export const READ_IDEAS_PAGINATED_CURSOR = {
  request: {
    query: ideaQuery.READ_IDEAS_PAGINATED_CURSOR,
    variables: { offset: 1, limit: 3 }
  },
  result: { data: { ideasPaginatedCursor: ideas } }
};

export const CURRENT_USER_IDEAS = {
  request: { query: ideaQuery.CURRENT_USER_IDEAS },
  result: { data: { ideas: ideas } }
};

//* - Mutations ----------

export const CREATE_IDEA = {
  request: {
    query: ideaQuery.CREATE_IDEA,
    variables: { content: 'mock idea' }
  },
  result: {
    data: { createIdea: { id: 1, content: 'mock idea', author: { id: '1' } } }
  }
};

export const UPDATE_IDEA = {
  request: {
    query: ideaQuery.UPDATE_IDEA,
    variables: { id: '1', content: 'updated mock idea' }
  },
  result: {
    data: { updateIdea: { id: 1, content: 'updated mock idea' } }
  }
};

export const REMOVE_IDEA = {
  request: { query: ideaQuery.REMOVE_IDEA, variables: { id: '1' } },
  result: { data: { removeIdea: { id: 1 } } }
};

export const DELETE_IDEA = {
  request: { query: ideaQuery.DELETE_IDEA, variables: { id: '1' } },
  result: { data: { deleteIdea: { id: 1 } } }
};
