import { UserInputError } from 'apollo-server-express';
import bcryptjs from 'bcryptjs';
// import argon2 from 'argon2';
// import crypto from 'crypto';

import { createAccessToken } from './accessToken.js';

const userClientCleaner = user => ({
  id: user.id,
  email: user.email,
  role: user.role
});

export const createUserObj = userRecord => {
  // Clean user data for client
  const clientUserData = userClientCleaner(userRecord);

  // Create user object
  const userObj = { user: clientUserData };

  // Return user object
  return userObj;
};

const createPayload = userRecord => {
  // Create payload for access token
  const payload = createUserObj(userRecord);

  // Create access token
  const accessToken = createAccessToken(payload);

  // Return access token
  return accessToken;
};

export const createUserObjandPayload = userRecord => {
  const user = createUserObj(userRecord);

  const accessToken = createPayload(userRecord);

  return [user, accessToken];
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

  if (!isCorrectPass) throw new UserInputError('error.user.password.invalid');
};
