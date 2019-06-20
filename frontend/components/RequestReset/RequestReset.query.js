import gql from 'graphql-tag';

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email)
  }
`;

export const MOCK_REQUEST_RESET_MUTATION = {
  request: {
    query: REQUEST_RESET_MUTATION,
    variables: { email: 'mock@email.com' }
  },
  result: {
    data: {
      requestReset: true
    }
  }
};
