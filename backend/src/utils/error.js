import { GraphQLError } from 'graphql';

export const AuthenticationError = message =>
  new GraphQLError(message, {
    extensions: {
      code: 'UNAUTHENTICATED',
      myExtension: 'foo'
    }
  });

export const ForbiddenError = message =>
  new GraphQLError(message, {
    extensions: {
      code: 'FORBIDDEN',
      myExtension: 'foo'
    }
  });

export const UserInputError = message =>
  new GraphQLError(message, {
    extensions: {
      code: 'BAD_USER_INPUT',
      myExtension: 'foo'
    }
  });

export const ValidationError = message =>
  new GraphQLError(message, {
    extensions: {
      code: 'GRAPHQL_VALIDATION_FAILED',
      myExtension: 'foo'
    }
  });
