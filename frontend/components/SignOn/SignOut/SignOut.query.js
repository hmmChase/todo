import gql from 'graphql-tag';

import { ME_QUERY } from '../SignOn.query';

export { ME_QUERY };

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut
  }
`;
