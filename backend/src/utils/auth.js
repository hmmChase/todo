import { AuthenticationError, UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

export const getMe = async cookies => await verifyJWT(cookies.token);

export const signJWT = async payload =>
  await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

export const verifyJWT = async token => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AuthenticationError(
      `Your session expired. Sign in again. (${err})`
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

export const validateEmail = email => {
  if (typeof email !== 'string') return false;

  // https://github.com/ansman/validate.js/blob/master/validate.js#L1060
  const regEx = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

  const isvalid = email.match(regEx);

  if (!isvalid)
    throw new UserInputError('Please provide a valid email address');
};

export const validatePassword = password => {
  if (typeof password !== 'string') return false;

  const hasLength = password.length >= 8;
  const hasUpper = password.match(/[A-Z]/g);
  const hasLower = password.match(/[a-z]/g);
  const hasNumber = password.match(/[0-9]/g);

  if (!hasLength)
    throw new UserInputError('Password must be at least 8 charactors');
  if (!hasUpper)
    throw new UserInputError('Password must contain an uppercase letter');
  if (!hasLower)
    throw new UserInputError('Password must contain a lowercase letter');
  if (!hasNumber) throw new UserInputError('Password must contain a number');
};

export const comparePasswords = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new UserInputError("Passwords don't match.");
  }
};

export const checkPassword = async (password, hashedPassword) => {
  const valid = await bcrypt.compare(password, hashedPassword);

  if (!valid) {
    throw new AuthenticationError('Invalid Password');
  }
};

export const genResetToken = async () => {
  const randomBytesPromisified = promisify(randomBytes);
  const resetTokenBytes = await randomBytesPromisified(20);
  const resetToken = resetTokenBytes.toString('hex');

  const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

  return { resetToken, resetTokenExpiry };
};
