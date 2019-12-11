import * as query from '../../graphql/queries/idea';

// export const MOCK_ME_IDEAS = {
//   request: { query: query.ME_IDEAS },
//   result: {
//     data: {
//       getUserIdeas: [
//         { id: '1', content: 'mock idea 1 content' },
//         { id: '2', content: 'mock idea 2 content' }
//       ]
//     }
//   }
// };

// export const MOCK_ERROR_ME_IDEAS = {
//   request: { query: query.ME_IDEAS },
//   error: new Error('mock error')
// };

export const MOCK_CURRENT_USER_PAGINATED_IDEAS = {
  request: {
    query: query.CURRENT_USER_PAGINATED_IDEAS,
    variables: { content: 'mock created idea' }
  },
  result: { data: { createIdea: [{ id: '1' }] } }
};

export const MOCK_CREATE_IDEA = {
  request: {
    query: query.CREATE_IDEA,
    variables: { content: 'mock created idea' }
  },
  result: { data: { createIdea: [{ id: '1' }] } }
};

export const MOCK_UPDATE_IDEA = {
  request: { query: query.UPDATE_IDEA },
  result: {
    data: { updateIdea: { id: '2', content: 'updated mock idea 2 content' } }
  }
};

export const MOCK_DELETE_IDEA = {
  request: { query: query.DELETE_IDEA, variables: { id: '1' } },
  result: { data: { deleteIdea: { id: '1' } } }
};
