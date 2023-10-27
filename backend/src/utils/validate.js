import { GraphQLError } from 'graphql';
import isEmail from 'isemail';

import { passwordMaxLength, passwordMinLength } from '../constants/config.js';

// error signature: domain.field.key

export const validateEmail = email => {
  const emailTrimmed = email.trim();

  const isvalid = isEmail.validate(emailTrimmed);

  if (!isvalid) throw new GraphQLError('user.email.invalid');

  return emailTrimmed;
};

export const validatePassword = password => {
  const passwordTrimmed = password.trim();

  const tooShort = passwordTrimmed.length < passwordMinLength;
  if (tooShort) throw new GraphQLError('user.email.tooShort');

  const tooLong = passwordTrimmed.length > passwordMaxLength;
  if (tooLong) throw new GraphQLError('user.email.tooLong');

  return passwordTrimmed;
};
