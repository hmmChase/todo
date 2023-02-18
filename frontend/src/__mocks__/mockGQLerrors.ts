import { ApolloError } from '@apollo/client';

const GQLError1 = {
  extensions: { displayCode: 'error' },

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

const GQLError2 = {
  extensions: { displayCode: 'user.null' },

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

export const mockGQLError = new ApolloError({ graphQLErrors: [GQLError1] });

export const mockGQLErrors = new ApolloError({
  graphQLErrors: [GQLError1, GQLError2]
});
