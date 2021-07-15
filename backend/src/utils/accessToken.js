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
    // Decode payload if signature is valid and JWT not expired
    const payload = jwt.verify(accessToken, secret);

    // Return payload
    return payload;
  } catch (error) {
    console.log('verifyAccessToken error : ', error);

    // If not, throw error
    throw new AuthenticationError('user.invalidCredentials');
  }
};
