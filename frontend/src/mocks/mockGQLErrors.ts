import { ApolloError } from '@apollo/client';

const GQLError = {
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

export const mockGQLError = new ApolloError({ graphQLErrors: [GQLError] });

export const mockGQLErrors = new ApolloError({
  graphQLErrors: [GQLError, GQLError]
});
