import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`;

export const MOCK_SIGN_IN_MUTATION = {
  request: {
    query: SIGN_IN_MUTATION,
    variables: {
      email: 'mock@email.com',
      password: 'mockpass'
    }
  },
  result: {
    data: {
      signIn: [
        {
          id: '1'
        }
      ]
    }
  }
};
