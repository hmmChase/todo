import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { accessTokenExpiryTime } from '../config';

export const createAccessToken = userId =>
  jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiryTime
  });

export const verifyAccessToken = accessToken => {
  try {
    // Return the decoded payload if the signature is valid and JWT not expired
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    // If not, throw error
    throw new AuthenticationError('Access Token invalid');
  }
};
