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

export const getCurrentUser = async token => {
  if (!token) return null;

  try {
    return await verifyJWT(token);
  } catch (err) {
    return null;
  }
};

export const isAuthenticated = currentUser => {
  if (!currentUser) throw new ForbiddenError('Must be signed in.');
};

export const signJWT = async payload =>
  // TODO: Add CSRK token
  // https://www.youtube.com/watch?v=67mezK3NzpU&feature=youtu.be&t=36m30s

  await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: config.JWTExpiryTime
  });

export const verifyJWT = async token => {
  try {
    // Return the decoded payload if the signature is valid
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // If not, throw the error
    if (err.name === 'TokenExpiredError') {
      // TODO: Figure out how to refresh token
      // console.log('TokenExpiredError');

      //   const decodedPayload = await jwt.decode(token);

      //   await res.clearCookie('token');

      //   payload = { user: { id: decodedPayload.userId } };

      //   await sendCookie(res, payload);

      throw new AuthenticationError('JWT expired: ', err);
    }

    throw new AuthenticationError('JWT invalid: ', err);
  }
};

export const sendCookie = async (res, payload) => {
  const JWT = await signJWT(payload);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: config.cookieMaxAge
  };

  try {
    await res.cookie('token', JWT, cookieOptions);
  } catch (err) {
    throw new AuthenticationError('Error creating cookie: ', err);
  }
};

export const clearCookie = res => {
  res.clearCookie('token');
};

export const validateEmail = email => {
  if (typeof email !== 'string')
    throw new AuthenticationError('Invalid email address');

  const isvalid = isEmail.validate(email);

  if (!isvalid)
    throw new AuthenticationError('Please provide a valid email address');
};

export const validatePassword = password => {
  if (typeof password !== 'string')
    throw new AuthenticationError('Invalid password');

  const hasLength = password.length >= 8;
  if (!hasLength)
    throw new AuthenticationError('Password must be at least 8 charactors');

  const hasUpper = password.match(/[A-Z]/g);
  if (!hasUpper)
    throw new AuthenticationError('Password must contain an uppercase letter');

  const hasLower = password.match(/[a-z]/g);
  if (!hasLower)
    throw new AuthenticationError('Password must contain a lowercase letter');

  const hasNumber = password.match(/[0-9]/g);
  if (!hasNumber)
    throw new AuthenticationError('Password must contain a number');
};

export const comparePasswords = (password, confirmPassword) => {
  if (password !== confirmPassword)
    throw new AuthenticationError("Passwords don't match.");
};

export const checkPassword = async (password, hashedPassword) => {
  const valid = await bcrypt.compare(password, hashedPassword);

  if (!valid) throw new AuthenticationError('Invalid Password');
};

export const genResetToken = async () => {
  const randomBytesPromisified = promisify(randomBytes);
  const resetTokenBytes = await randomBytesPromisified(20);

  const resetToken = resetTokenBytes.toString('hex');
  const resetTokenExpiry = Date.now() + config.resetTokenExpiryTime;

  return { resetToken, resetTokenExpiry };
};

export const validateTokenExpiry = resetTokenExpiry => {
  const isTokenExpired = Date.now() > resetTokenExpiry;

  if (isTokenExpired)
    throw new AuthenticationError(
      'Your reset token is expired.  Please request a new one.'
    );
};
