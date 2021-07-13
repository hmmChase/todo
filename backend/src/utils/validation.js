import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import isEmail from 'isemail';
import { passwordMinLength, passwordMaxLength } from '../config';

/* Email */

export const isEmailWellFormed = email => {
  const notString = typeof email !== 'string';

  if (notString) throw new UserInputError('Invalid email address');

  const isvalid = isEmail.validate(email);

  if (!isvalid)
    throw new UserInputError('Please provide a valid email address');
};

/* Password */

export const isPasswordWellFormed = password => {
  /*
  https://regexr.com/3bfsi
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  - At least 8 characters
  - Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
  - Can contain special characters
  */

  const notString = typeof password !== 'string';
  if (notString) throw new UserInputError('Invalid password');

  const tooShort = password.length < passwordMinLength;
  if (tooShort)
    throw new UserInputError(
      `Password must have at least ${passwordMinLength} characters`
    );

  const tooLong = password.length > passwordMaxLength;
  if (tooLong)
    throw new UserInputError(
      `Password must have no more than ${passwordMaxLength} characters`
    );

  const hasUpperCase = password.match(/[A-Z]/g);
  if (!hasUpperCase)
    throw new UserInputError('Password must contain an uppercase letter');

  const hasLowerCase = password.match(/[a-z]/g);
  if (!hasLowerCase)
    throw new UserInputError('Password must contain a lowercase letter');

  const hasNumber = password.match(/[0-9]/g);
  if (!hasNumber) throw new UserInputError('Password must contain a number');
};

export const validatePassword = async (inputPassword, hashedPassword) => {
  // const valid = await argon2.verify(hashedPassword, inputPassword);

  const isCorrectPass = await bcrypt.compare(inputPassword, hashedPassword);

  if (!isCorrectPass) throw new UserInputError('login.invalidCredentials');
};
