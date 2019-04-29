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
