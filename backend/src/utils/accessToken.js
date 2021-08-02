import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import { options } from '../config';

const secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

export const createAccessToken = userId =>
  jwt.sign({ userId }, secret, options);

export const verifyAccessToken = accessToken => {
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
