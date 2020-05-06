import {
  AuthenticationError,
  _ForbiddenError,
  _UserInputError,
} from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import isEmail from 'isemail';
// import Filter from 'bad-words';
import {
  accessTokenExpiryTime,
  refreshTokenExpiryTime,
  refreshTokenCookieMaxAge,
  usernameMinLength,
  usernameMaxLength,
} from '../config';

/* Username */

export const validateUsername = (username) => {
  /*
  https://regexr.com/3cg7r
  /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm
  - Can contain characters a-z, 0-9, underscores and periods
  - Cannot start with a period nor end with a period
  - Must not have more than one period sequentially
  - Max length is 30 chars
  */

  const notString = typeof username !== 'string';
  if (notString) throw new AuthenticationError('Invalid username');

  const hasSpaces = username.indexOf(' ') !== -1;
  if (hasSpaces)
    throw new AuthenticationError(`Username must not contain spaces`);

  const tooShort = username.length < usernameMinLength;
  if (tooShort)
    throw new AuthenticationError(
      `Username must have at least ${usernameMinLength} letters`
    );

  const tooLong = username.length > usernameMaxLength;
  if (tooLong)
    throw new AuthenticationError(
      `Username must have no more than ${usernameMaxLength} letters`
    );

  // const regExRules = `/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,${usernameMaxLength -
  // 1}}$/gim`;
  // const isValidUsername = username.match(regExRules);
  // if (!isValidUsername) throw new AuthenticationError('Username is not valid');

  // let filter = new Filter();
  // const isProfane = filter.isProfane(username);
  // if (isProfane)
  // throw new AuthenticationError('Username contains restricted words');
};

/* Email */

export const validateEmail = (email) => {
  const notString = typeof email !== 'string';

  if (notString) throw new AuthenticationError('Invalid email address');

  const isvalid = isEmail.validate(email);

  if (!isvalid)
    throw new AuthenticationError('Please provide a valid email address');
};

/* Password */

export const validatePassword = (password) => {
  /*
  https://regexr.com/3bfsi
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  - At least 8 characters
  - Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
  - Can contain special characters
  */

  const notString = typeof password !== 'string';
  if (notString) throw new AuthenticationError('Invalid password');

  const tooShort = password.length < 8;
  if (tooShort)
    throw new AuthenticationError('Password must be at least 8 characters');

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

/* Access Token */

export const createAccessToken = (userId) =>
  jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiryTime,
  });

export const verifyAccessToken = (accessToken) => {
  try {
    // Return the decoded payload if the signature is valid and JWT not expired
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    // If not, throw error
    throw new AuthenticationError('Access Token invalid');
  }
};

/* Refresh Token */

export const createRefreshToken = (userId, refreshTokenVersion) =>
  jwt.sign({ userId, refreshTokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiryTime,
  });

export const sendRefreshToken = (res, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: refreshTokenCookieMaxAge,
    sameSite: 'strict',
  };

  res.cookie('rt', refreshToken, cookieOptions);

  // res.setHeader(
  //   'Set-Cookie',
  //   cookie.serialize('rt', refreshToken, cookieOptions)
  // );
};

/* Password Reset Token */

export const createPasswordResetToken = async () => {
  const randomBytesPromisified = promisify(randomBytes);
  const resetTokenBytes = await randomBytesPromisified(20);

  const resetToken = resetTokenBytes.toString('hex');
  const resetTokenExpiry = Date.now() + resetTokenExpiryTime;

  return { resetToken, resetTokenExpiry };
};

export const validateResetTokenExpiry = (resetTokenExpiry) => {
  const isTokenExpired = Date.now() > resetTokenExpiry;

  if (isTokenExpired)
    throw new AuthenticationError(
      'Your reset request has expired.  Please submit a new one.'
    );
};
