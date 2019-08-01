import gql from 'graphql-tag';

export const ME_IDEAS_QUERY = gql`
  query ME_IDEAS_QUERY {
    getUserIdeas {
      id
      content
    }
  }
`;

export const MOCK_ME_IDEAS_QUERY = {
  request: {
    query: ME_IDEAS_QUERY
  },
  result: {
    data: {
      getUserIdeas: [
        {
          id: '1',
          content: 'mock idea 1 content'
        },
        {
          id: '2',
          content: 'mock idea 2 content'
        }
      ]
    }
  }
};

export const MOCK_ERROR_ME_IDEAS_QUERY = {
  request: {
    query: ME_IDEAS_QUERY
  },
  error: new Error('mock error')
};
