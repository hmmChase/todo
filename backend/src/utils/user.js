import { UserInputError } from 'apollo-server-express';
import bcryptjs from 'bcryptjs';
// import argon2 from 'argon2';
// import crypto from 'crypto';

import { createAccessToken } from './accessToken';

export const prepareUser = userRecord => {
  // Create payload for access token
  const payload = { userId: userRecord.id };

  // Create access token
  const accessToken = createAccessToken(payload);

  // Clean user data for client
  const clientUserData = userClientCleaner(userRecord);

  // Create user object
  const user = { user: clientUserData };

  // Return access token & user object
  return [accessToken, user];
};

export const passwordCompare = async (inputPassword, userPassword) => {
  /**
  const passwordHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
    .toString('hex');
  const passwordsMatch = inputPassword === userPassword;

  const valid = await argon2.verify(inputPassword, userPassword);
  */

  const isCorrectPass = await bcryptjs.compare(inputPassword, userPassword);

  if (!isCorrectPass) throw new UserInputError('user.auth.invalid');
};

export const userClientCleaner = user => ({
  id: user.id,
  email: user.email,
  role: user.role
});
