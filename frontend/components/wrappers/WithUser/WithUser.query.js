import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      email
    }
  }
`;

export const MOCK_ME_QUERY = {
  request: {
    query: ME_QUERY
  },
  result: {
    data: {
      me: {
        id: '1',
        email: 'mock@email.com'
      }
    }
  }
};
