import { ForbiddenError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';
import * as auth from '../utils/auth';

export const isAuthenticated = async (parent, args, ctx, info) => {
  const me = req.cookies.token ? await auth.verifyJWT(req.cookies.token) : null;

  // ctx.me ? skip : new ForbiddenError('You must be signed in.');
};
