import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export const getMe = async cookies => await verifyJWT(cookies.token);

export const signJWT = async payload =>
  await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

export const verifyJWT = async token => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    throw new AuthenticationError(
      `Your session expired. Sign in again. (error: ${e})`
    );
  }
};

export const sendCookie = async (res, payload) => {
  const JWT = await signJWT(payload);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  };

  res.cookie('token', JWT, cookieOptions);
};
