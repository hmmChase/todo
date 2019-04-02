import gql from 'graphql-tag';

export const RESET_REQUEST_MUTATION = gql`
  mutation RESET_REQUEST_MUTATION($email: String!) {
    resetRequest(email: $email)
  }
`;
