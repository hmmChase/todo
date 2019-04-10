import { ForbiddenError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, ctx, info) =>
  ctx.me ? skip : new ForbiddenError('You must be signed in.');
