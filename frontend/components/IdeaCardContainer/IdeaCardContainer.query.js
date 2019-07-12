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
          content: 'mock content'
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

// export const ALL_IDEAS_QUERY = gql`
//   query ALL_IDEAS_QUERY {
//     ideas {
//       id
//       content
//     }
//   }
// `;

// export const MOCK_ALL_IDEAS_QUERY = {
//   request: {
//     query: ALL_IDEAS_QUERY
//   },
//   result: {
//     data: {
//       ideas: [
//         {
//           id: '1',
//           content: 'mock content'
//         }
//       ]
//     }
//   }
// };

// export const USER_IDEAS_QUERY = gql`
//   query USER_IDEAS_QUERY($author: ID!) {
//     idea(author: $id) {
//       id
//       content
//     }
//   }
// `;

// export const MOCK_USER_IDEAS_QUERY = {
//   request: {
//     query: USER_IDEAS_QUERY
//   },
//   result: {
//     data: {
//       idea: [
//         {
//           id: '1',
//           content: 'mock content'
//         }
//       ]
//     }
//   }
// };
