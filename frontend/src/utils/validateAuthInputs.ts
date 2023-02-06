import { passwordMaxLength, passwordMinLength } from '@/constants/config';
import * as yup from 'yup';
import displayMessages from '@/constants/displayMessages';
// import isEmail from 'isemail';
// import Filter from 'bad-words';

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
