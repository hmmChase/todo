import {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import isEmail from 'isemail';

import * as config from '../config';

/* Email */

export const validateEmail = email => {
  if (typeof email !== 'string')
    throw new AuthenticationError('Invalid email address');

  const isvalid = isEmail.validate(email);

  if (!isvalid)
    throw new AuthenticationError('Please provide a valid email address');
};

/* Password */

export const validatePassword = password => {
  if (typeof password !== 'string')
    throw new AuthenticationError('Invalid password');

  const hasLength = password.length >= 8;
  if (!hasLength)
    throw new AuthenticationError('Password must be at least 8 charactors');

  const hasUpperCase = password.match(/[A-Z]/g);
  if (!hasUpperCase)
    throw new AuthenticationError('Password must contain an uppercase letter');

  const hasLowerCase = password.match(/[a-z]/g);
  if (!hasLowerCase)
    throw new AuthenticationError('Password must contain a lowercase letter');

  const hasNumber = password.match(/[0-9]/g);
  if (!hasNumber)
    throw new AuthenticationError('Password must contain a number');
};

export const checkPassword = async (password, hashedPassword) => {
  const valid = await bcrypt.compare(password, hashedPassword);

  if (!valid) throw new AuthenticationError('Invalid Password');
};

export const comparePasswords = (password, confirmPassword) => {
  if (password !== confirmPassword)
    throw new AuthenticationError("Passwords don't match.");
};

/* Acess Token */

export const createAccessToken = userId => {
  // TODO: Add CSRK token
  // https://www.youtube.com/watch?v=67mezK3NzpU&feature=youtu.be&t=36m30s

  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: config.accessTokenExpiryTime
  });
};

export const verifyAccessToken = accessToken => {
  try {
    // Return the decoded payload if the signature is valid and not expired
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    console.log('TCL: err', err);

    // If not, throw the error
    throw new AuthenticationError('Access Token invalid');
  }
};

/* Refesh Token */

export const createRefreshToken = (userId, tokenVersion) => {
  return jwt.sign({ userId, tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: config.refreshTokenExpiryTime
  });
};

export const verifyRefreshToken = refreshToken => {
  try {
    // Return the decoded payload if the signature is valid and not expired
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    // if (err.name === 'TokenExpiredError') {
    //   // TODO: Figure out how to refresh token
    //   //   const decodedPayload = await jwt.decode(token);
    //   //   await res.clearCookie('token');
    //   //   payload = { user: { id: decodedPayload.userId } };
    //   //   await sendCookie(res, payload);
    // }

    // If not, throw the error
    throw new AuthenticationError('Refresh Token invalid');
  }
};

export const sendRefreshToken = (res, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: config.refreshTokenCookieMaxAge
    // domain: '.now.sh',
    // path: "/refresh_token"
  };

  res.cookie('rt', refreshToken, cookieOptions);
};

/* Password Reset Token */

export const createPasswordResetToken = async () => {
  const randomBytesPromisified = promisify(randomBytes);
  const resetTokenBytes = await randomBytesPromisified(20);

  const resetToken = resetTokenBytes.toString('hex');
  const resetTokenExpiry = Date.now() + config.resetTokenExpiryTime;

  return { resetToken, resetTokenExpiry };
};

export const validateResetTokenExpiry = resetTokenExpiry => {
  const isTokenExpired = Date.now() > resetTokenExpiry;

  if (isTokenExpired)
    throw new AuthenticationError(
      'Your reset request has expired.  Please submit a new one.'
    );
};
