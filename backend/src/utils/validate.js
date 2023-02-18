import { passwordMaxLength, passwordMinLength } from '../constants/config.js';
import GQLError from '../utils/GQLError.js';
import isEmail from 'isemail';

/** ----- Email ----- */

const validateEmail = email => {
  // Check if missing args
  if (!email) GQLError(400, 'validateEmail');

  // Type check
  if (typeof email !== 'string') GQLError(400, 'validateEmail');

  // Check if email is well-formed
  isEmailWellFormed(email);
};

const isEmailWellFormed = email => {
  // Ensure valid email address
  const isvalid = isEmail.validate(email);

  if (!isvalid)
    GQLError(400, 'isEmailWellFormed', 'error.user.isEmailWellFormed.invalid');
};

/** ----- Password ----- */

const isPasswordWellFormed = password => {
  /*
  https://regexr.com
  - within min & max characters
  */

  const tooShort = password.length < passwordMinLength;
  if (tooShort) GQLError(422, 'tooShort', 'user.password.short');

  const tooLong = password.length > passwordMaxLength;
  if (tooLong) GQLError(422, 'tooLong', 'user.password.long');
};

const validatePassword = password => {
  // Check if missing args
  if (!password) GQLError(400, 'validatePassword');

  // Type check
  if (typeof password !== 'string') GQLError(400, 'validatePassword');

  // Check if password is well-formed
  isPasswordWellFormed(password);
};

const validate = inputs => {
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

export default validate;
