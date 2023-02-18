import { GraphQLError } from 'graphql';

const GQLError = (httpStatus, message, displayCode) => {
  throw new GraphQLError(message, { extensions: { displayCode, httpStatus } });
};

export default GQLError;
