import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import { accessTokenExpiryTime } from '../config';

export const createAccessToken = userId => {
  const secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

  const options = { expiresIn: accessTokenExpiryTime };

  return jwt.sign({ userId }, secret, options);
};

export const verifyAccessToken = accessToken => {
  const secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

  try {
    // Return the decoded payload if the signature is valid and JWT not expired
    const payload = jwt.verify(accessToken, secret);

    console.log('payload:', payload);

    return payload;
  } catch (error) {
    console.log('error: ', error);

    // If not, throw error
    throw new AuthenticationError('user.invalidCredentials');
  }
};
