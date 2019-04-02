import gql from 'graphql-tag';

import { ME_QUERY } from '../SignOn.query';

export { ME_QUERY };

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`;
