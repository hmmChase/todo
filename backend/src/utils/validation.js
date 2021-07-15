import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import isEmail from 'isemail';
import { passwordMinLength, passwordMaxLength } from '../config';

/* Email */

export const isEmailWellFormed = email => {
  const isvalid = isEmail.validate(email);

  if (!isvalid) throw new UserInputError({ error: 'email.invalid' });
};

/* Password */

export const isPasswordWellFormed = password => {
  /*
  https://regexr.com/3bfsi
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  - within min & max characters
  */

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
};

export const validatePassword = async (inputPassword, hashedPassword) => {
  // const valid = await argon2.verify(hashedPassword, inputPassword);

  const isCorrectPass = await bcrypt.compare(inputPassword, hashedPassword);

  if (!isCorrectPass) throw new UserInputError('login.invalidCredentials');
};
