import gql from 'graphql-tag';

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut
  }
`;
