import gql from 'graphql-tag';

import { USERS_QUERY } from '../../Users/Users.query';
import { ME_QUERY } from '../SignOn.query';

export { USERS_QUERY, ME_QUERY };

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
