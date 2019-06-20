import gql from 'graphql-tag';

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
    }
  }
`;

export const MOCK_RESET_PASSWORD_MUTATION = {
  request: {
    query: RESET_PASSWORD_MUTATION,
    variables: {
      resetToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72',
      password: 'mockpass',
      confirmPassword: 'mockpass'
    }
  },
  result: {
    data: {
      resetPassword: [
        {
          id: '1',
          email: 'mock@email.com'
        }
      ]
    }
  }
};
