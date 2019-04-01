import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export const getMe = async cookies => {
  const { token } = cookies;

  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};
