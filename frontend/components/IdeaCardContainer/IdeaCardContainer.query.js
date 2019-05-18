import gql from 'graphql-tag';

export const ALL_IDEAS_QUERY = gql`
  query ALL_IDEAS_QUERY {
    ideas {
      id
      content
    }
  }
`;

export const USER_IDEAS_QUERY = gql`
  query USER_IDEAS_QUERY($author: ID!) {
    idea(author: $id) {
      id
      content
    }
  }
`;

export const ME_IDEAS_QUERY = gql`
  query ME_IDEAS_QUERY {
    getUserIdeas {
      id
      content
    }
  }
`;
