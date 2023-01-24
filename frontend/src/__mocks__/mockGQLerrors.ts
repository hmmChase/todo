import { ApolloError } from '@apollo/client';

const mockGQLerrors = new ApolloError({
  graphQLErrors: [
    {
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
    },

    {
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
    }
  ]
});

export default mockGQLerrors;

// [
//   {
//     code: 'UNAUTHENTICATED',
//     message: 'You must be logged in to do that'
//   },
//   {
//     code: 'FORBIDDEN',
//     message: 'You do not have permission to do that'
//   },
//   {
//     code: 'BAD_USER_INPUT',
//     message: 'Invalid input'
//   }
// ];
