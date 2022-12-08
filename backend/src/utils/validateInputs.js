import isEmail from 'isemail';

import { passwordMaxLength, passwordMinLength } from '../constants/config.js';
import { UserInputError } from '../utils/error.js';

/** ----- Email ----- */

const validateEmail = email => {
  // Check if missing args
  if (!email) throw UserInputError('missing', { argumentName: 'email' });

  // Type check
  if (typeof email !== 'string')
    throw UserInputError('type', { argumentName: 'email' });

  // Check if email is well-formed
  isEmailWellFormed(email);
};

const isEmailWellFormed = email => {
  // Ensure valid email address
  const isvalid = isEmail.validate(email);

  if (!isvalid) throw UserInputError('error.user.isEmailWellFormed.invalid');
};

/** ----- Password ----- */

const isPasswordWellFormed = password => {
  /*
  https://regexr.com
  - within min & max characters
  */

  const tooShort = password.length < passwordMinLength;
  if (tooShort) throw UserInputError({ msg: 'user.password.short' });

  const tooLong = password.length > passwordMaxLength;
  if (tooLong) throw UserInputError({ msg: 'user.password.long' });
};

const validatePassword = password => {
  // Check if missing args
  if (!password) throw UserInputError('missing', { argumentName: 'password' });

  // Type check
  if (typeof password !== 'string')
    throw UserInputError('type', { argumentName: 'password' });

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
