import * as query from '../../graphql/queries/idea';

export const MOCK_ME_IDEAS_QUERY = {
  request: { query: query.ME_IDEAS_QUERY },
  result: {
    data: {
      getUserIdeas: [
        { id: '1', content: 'mock idea 1 content' },
        { id: '2', content: 'mock idea 2 content' }
      ]
    }
  }
};

export const MOCK_ERROR_ME_IDEAS_QUERY = {
  request: { query: query.ME_IDEAS_QUERY },
  error: new Error('mock error')
};

export const MOCK_CREATE_IDEA_MUTATION = {
  request: {
    query: CREATE_IDEA_MUTATION,
    variables: { content: 'mock created idea' }
  },
  result: { data: { createIdea: [{ id: '1' }] } }
};

export const MOCK_UPDATE_IDEA_MUTATION = {
  request: { query: UPDATE_IDEA_MUTATION },
  result: {
    data: { updateIdea: { id: '2', content: 'updated mock idea 2 content' } }
  }
};

export const MOCK_DELETE_IDEA_MUTATION = {
  request: { query: DELETE_IDEA_MUTATION, variables: { id: '1' } },
  result: { data: { deleteIdea: { id: '1' } } }
};
