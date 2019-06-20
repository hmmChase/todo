import gql from 'graphql-tag';

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

export const MOCK_SIGN_UP_MUTATION = {
  request: {
    query: SIGN_UP_MUTATION,
    variables: {
      email: 'mock@email.com',
      password: 'mockpass',
      confirmPassword: 'mockpass'
    }
  },
  result: {
    data: {
      signUp: [
        {
          id: '1'
        }
      ]
    }
  }
};
