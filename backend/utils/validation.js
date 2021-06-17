import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import isEmail from 'isemail';
import Filter from 'bad-words';
import {
  usernameMinLength,
  usernameMaxLength,
  passwordMinLength,
  passwordMaxLength
} from '../config';

/* Username */

export const validateUsername = username => {
  /*
  https://regexr.com/3cg7r
  /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm
  - Can contain characters a-z, 0-9, underscores and periods
  - Cannot start with a period nor end with a period
  - Must not have more than one period sequentially
  - Max length is 30 chars
  */

  const notString = typeof username !== 'string';
  if (notString) throw new UserInputError('Invalid username');

  const hasSpaces = username.match(/[\s]/g);
  if (hasSpaces) throw new UserInputError('Username must not contain spaces');

  const tooShort = username.length < usernameMinLength;
  if (tooShort)
    throw new UserInputError(
      `Username must have at least ${usernameMinLength} characters`
    );

  const tooLong = username.length > usernameMaxLength;
  if (tooLong)
    throw new UserInputError(
      `Username must have no more than ${usernameMaxLength} characters`
    );

  const firstCharBad = username.match(/^[\.\_]/g);
  if (firstCharBad)
    throw new UserInputError('Username must start with an alphanumeric');

  const lastCharBad = username.match(/[\.\_]$/g);
  if (lastCharBad)
    throw new UserInputError('Username must end with an alphanumeric');

  const consecutiveUnderscores = username.match(/(?=.\_)[\_]/g);
  if (consecutiveUnderscores)
    throw new UserInputError(
      'Username must not contain consecutive underscores'
    );

  const consecutivePeriods = username.match(/(?=.\.)[\.]/g);
  if (consecutivePeriods)
    throw new UserInputError('Username must not contain consecutive periods');

  const notAlphanumeric = username.match(/[^\w\.]/g);
  if (notAlphanumeric)
    throw new UserInputError(
      'Username must contain only letters, numbers, and nonconsecutive underscores and/or periods (excluded to start or end with)'
    );

  // https://github.com/web-mech/badwords/issues/60
  const filter = new Filter();
  const isProfane = filter.isProfane(username);
  if (isProfane) throw new UserInputError('Username contains restricted words');
};

/* Email */

export const validateEmail = email => {
  const notString = typeof email !== 'string';

  if (notString) throw new UserInputError('Invalid email address');

  const isvalid = isEmail.validate(email);

  if (!isvalid)
    throw new UserInputError('Please provide a valid email address');
};

/* Password */

export const validatePassword = password => {
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

export const checkPassword = async (password, hashedPassword) => {
  const valid = await bcrypt.compare(password, hashedPassword);

  if (!valid) throw new UserInputError('Invalid Password');
};

export const comparePasswords = (password, confirmPassword) => {
  if (password !== confirmPassword)
    throw new UserInputError("Passwords don't match.");
};
