import { GraphQLError } from 'graphql';
import { promisify } from 'util';
import { randomBytes } from 'crypto';

import { passResetExpiry, passResetTokenBytes } from '../constants/config.js';

export const createPassReset = async () => {
  const randomBytesPromise = promisify(randomBytes);

  const resetTokenBytes = await randomBytesPromise(passResetTokenBytes);

  const passResetToken = resetTokenBytes.toString('hex');

  return [passResetExpiry, passResetToken];
};

export const validatePassReset = passResetExpiry => {
  const tokenExpired = Date.now() > passResetExpiry;

  if (tokenExpired) throw new GraphQLError('user.passResetToken.expired');
};
