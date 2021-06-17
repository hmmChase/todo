import jwt from 'jsonwebtoken';
import { refreshTokenExpiryTime, refreshTokenCookieMaxAge } from '../config';

export const createRefreshToken = (userId, refreshTokenVersion) =>
  jwt.sign({ userId, refreshTokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiryTime
  });

export const sendRefreshToken = (res, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: refreshTokenCookieMaxAge,
    sameSite: 'strict'
  };

  res.cookie('rt', refreshToken, cookieOptions);

  // res.setHeader(
  //   'Set-Cookie',
  //   cookie.serialize('rt', refreshToken, cookieOptions)
  // );
};
