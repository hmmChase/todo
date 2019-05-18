import * as auth from '../utils/auth';

export const isAuthenticated = async (parent, args, ctx, info) => {
  return req.cookies.token ? await auth.verifyJWT(req.cookies.token) : null;
};
