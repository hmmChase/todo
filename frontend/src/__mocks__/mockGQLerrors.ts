import { ApolloError } from '@apollo/client';

const gqlError1 = {
  extensions: { code: 'BAD_USER_INPUT', displayCode: 'error' },

  // the rest of this is to quiet typescript
  [Symbol.toStringTag]: '',
  locations: [],
  message: '',
  name: '',
  nodes: [],
  originalError: undefined,
  path: [],
  positions: [],
  source: undefined,
  toJSON: (): any => {}
};

const gqlError2 = {
  extensions: { code: 'BAD_USER_INPUT', displayCode: 'user.null' },

  // the rest of this is to quiet typescript
  [Symbol.toStringTag]: '',
  locations: [],
  message: '',
  name: '',
  nodes: [],
  originalError: undefined,
  path: [],
  positions: [],
  source: undefined,
  toJSON: (): any => {}
};

export const mockGQLerror = new ApolloError({ graphQLErrors: [gqlError1] });

export const mockGQLerrors = new ApolloError({
  graphQLErrors: [gqlError1, gqlError2]
});

// other types of errors:
// [
//   {
//     code: 'UNAUTHENTICATED',
//     message: 'You must be logged in to do that'
//   },
//   {
//     code: 'FORBIDDEN',
//     message: 'You do not have permission to do that'
//   }
// ];
