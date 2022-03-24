import * as yup from 'yup';
// import isEmail from 'isemail';
// import Filter from 'bad-words';

import { passwordMaxLength, passwordMinLength } from '../constants/config';
import displayMessages from '../constants/displayMessages';

/* Email */
export const email = yup
  .string()
  .email(displayMessages.user.email.invalid)
  .max(255, displayMessages.user.email.length)
  .required(displayMessages.user.email.required);
// .label('email'),

/* Password */
export const password = yup
  .string()
  .min(passwordMinLength, displayMessages.user.password.short)
  .max(passwordMaxLength, displayMessages.user.password.long)
  .required(displayMessages.user.password.required);
// .label('password'),
