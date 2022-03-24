import { UserInputError } from 'apollo-server-express';
import isEmail from 'isemail';

import { passwordMaxLength, passwordMinLength } from '../constants/config.js';

/** ----- Email ----- */

const validateEmail = email => {
  // Check if missing args
  if (!email) throw new UserInputError('missing', { argumentName: 'email' });

  // Type check
  if (typeof email !== 'string')
    throw new UserInputError('type', { argumentName: 'email' });

  // Check if email is well-formed
  isEmailWellFormed(email);
};

const isEmailWellFormed = email => {
  // Ensure valid email address
  const isvalid = isEmail.validate(email);

  if (!isvalid)
    throw new UserInputError('error.user.isEmailWellFormed.invalid');
};

/** ----- Password ----- */

const isPasswordWellFormed = password => {
  /*
  https://regexr.com
  - within min & max characters
  */

  const tooShort = password.length < passwordMinLength;
  if (tooShort) throw new UserInputError({ msg: 'user.password.short' });

  const tooLong = password.length > passwordMaxLength;
  if (tooLong) throw new UserInputError({ msg: 'user.password.long' });
};

const validatePassword = password => {
  // Check if missing args
  if (!password)
    throw new UserInputError('missing', { argumentName: 'password' });

  // Type check
  if (typeof password !== 'string')
    throw new UserInputError('type', { argumentName: 'password' });

  // Check if password is well-formed
  isPasswordWellFormed(password);
};

export const validateInputs = inputs => {
  // Loop through inputs
  for (const key in inputs) {
    // Get value
    const value = inputs[key];

    // Remove leading and trailing whitespace
    const valueTrimmed = value.trim();

    if (key === 'email') {
      // Ensure lowercased
      const emailNormalized = valueTrimmed.toLowerCase();

      // Validate
      validateEmail(emailNormalized);

      // Update input
      inputs.email = emailNormalized;
    } else if (key === 'password') validatePassword(valueTrimmed);
  }

  return inputs;
};
