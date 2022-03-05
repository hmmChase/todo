import { UserInputError } from 'apollo-server-express';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

import {
  cryptoRandomBytesSize,
  resetPassTokenExpiryTime
} from '../constants/config.js';

export const createResetPassToken = async () => {
  const randomBytesPromise = promisify(randomBytes);
  const resetTokenBytes = await randomBytesPromise(cryptoRandomBytesSize);

  const resetPassToken = resetTokenBytes.toString('hex');
  const resetPassTokenExpiry = new Date(resetPassTokenExpiryTime).toISOString();

  return [resetPassToken, resetPassTokenExpiry];
};

export const validateResetPassTokenExpiry = resetPassTokenExpiry => {
  const isTokenExpired = Date.now() > resetPassTokenExpiry;

  if (isTokenExpired)
    throw new UserInputError('error.user.resetPass.tokenExpired');
};
