import { UserInputError } from 'apollo-server-express';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

import {
  passResetExpiry,
  passwordResetTokenBytesSize
} from '../constants/config.js';

export const createPassReset = async () => {
  const randomBytesPromise = promisify(randomBytes);

  const resetTokenBytes = await randomBytesPromise(passwordResetTokenBytesSize);

  const passResetToken = resetTokenBytes.toString('hex');

  return [passResetExpiry, passResetToken];
};

export const validatePassReset = passResetExpiry => {
  const tokenExpired = Date.now() > passResetExpiry;

  if (tokenExpired) throw new UserInputError({ msg: 'user.passReset.expired' });
};
