import { UserInputError } from 'apollo-server-express';
import isEmail from 'isemail';

import { passwordMinLength, passwordMaxLength } from '../constants/config.js';

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

/** ----- Email ----- */

const validateEmail = email => {
  // Check if missing args
  if (!email) throw new UserInputError('error.user.validateEmail.missing');

  // Type check
  if (typeof email !== 'string')
    throw new UserInputError('error.user.validateEmail.invalid');

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

const validatePassword = password => {
  // Check if missing args
  if (!password)
    throw new UserInputError('error.user.validatePassword.missing');

  // Type check
  if (typeof password !== 'string')
    throw new UserInputError('error.user.validatePassword.invalid');

  // Check if password is well-formed
  isPasswordWellFormed(password);
};

const isPasswordWellFormed = password => {
  /*
  https://regexr.com
  - within min & max characters
  */

  const tooShort = password.length < passwordMinLength;
  if (tooShort)
    throw new UserInputError('error.user.isPasswordWellFormed.tooShort');

  const tooLong = password.length > passwordMaxLength;
  if (tooLong)
    throw new UserInputError('error.user.isPasswordWellFormed.tooLong');
};
