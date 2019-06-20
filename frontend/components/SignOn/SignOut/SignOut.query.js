import gql from 'graphql-tag';

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut
  }
`;

export const MOCK_SIGN_OUT_MUTATION = {
  request: {
    query: SIGN_OUT_MUTATION
  },
  result: {
    data: {
      signOut: true
    }
  }
};
