const { GraphQLError } = require('graphql');
import * as query from '../../../graphql/queries/idea';

export const MOCK_CREATE_IDEA = {
  request: {
    query: query.CREATE_IDEA,
    variables: { content: 'mock idea' }
  },
  result: {
    data: {
      createIdea: [{ id: '1', content: 'mock idea', author: { id: '1' } }]
    }
  }
};

export const MOCK_UPDATE_IDEA = {
  request: {
    query: query.UPDATE_IDEA,
    variables: { id: '1', content: 'updated mock idea' }
  },
  result: {
    data: { updateIdea: { id: '1', content: 'updated mock idea' } }
  }
};

export const MOCK_ERROR_UPDATE_IDEA = {
  request: {
    query: query.UPDATE_IDEA,
    variables: { id: '1', content: 'updated mock idea' }
  },
  error: new Error('mock error')
};

export const MOCK_DELETE_IDEA = {
  request: { query: query.DELETE_IDEA, variables: { id: '1' } },
  result: { data: { deleteIdea: { id: '1' } } }
};

export const MOCK_IDEAS_CONNECTION = {
  request: { query: query.IDEAS_CONNECTION },
  result: { data: { ideasConnection: {} } }
};

export const MOCK_CURRENT_USER_IDEA = {
  request: { query: query.CURRENT_USER_IDEA, variables: { id: '1' } },
  result: {
    data: {
      currentUserIdea: { id: '1', content: 'mock idea', author: { id: '1' } }
    }
  }
};

export const MOCK_ERROR_CURRENT_USER_IDEA = {
  request: { query: query.CURRENT_USER_IDEA, variables: { id: '1' } },
  error: new Error('mock error')
};

export const MOCK_CURRENT_USER_IDEAS = {
  request: { query: query.CURRENT_USER_IDEAS },
  result: { data: { currentUserIdeas: {} } }
};

export const MOCK_CURRENT_USER_PAGINATED_IDEAS = {
  request: {
    query: query.CURRENT_USER_PAGINATED_IDEAS,
    variables: { first: 5 }
  },
  result: {
    data: {
      currentUserPaginatedIdeas: {
        edges: [
          { node: { id: '1', content: 'a', author: { id: '1' } } },
          { node: { id: '2', content: 'b', author: { id: '2' } } },
          { node: { id: '3', content: 'c', author: { id: '3' } } },
          { node: { id: '4', content: 'd', author: { id: '4' } } },
          { node: { id: '5', content: 'e', author: { id: '5' } } }
        ],
        pageInfo: { endCursor: '87cvybx', hasNextPage: true }
      }
    }
  }
};

export const MOCK_CURRENT_USER_PAGINATED_IDEAS_EMPTY = {
  request: {
    query: query.CURRENT_USER_PAGINATED_IDEAS,
    variables: { first: 5 }
  },
  result: {
    data: {
      currentUserPaginatedIdeas: {
        edges: [],
        pageInfo: { endCursor: '87cvybx', hasNextPage: false }
      }
    }
  }
};

export const MOCK_ERROR_CURRENT_USER_PAGINATED_IDEAS = {
  request: {
    query: query.CURRENT_USER_PAGINATED_IDEAS,
    variables: { first: 5 }
  },
  error: new Error('mock error')
};

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
