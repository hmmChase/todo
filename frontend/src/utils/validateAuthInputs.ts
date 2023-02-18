import { passwordMaxLength, passwordMinLength } from '@/constants/config';
import * as yup from 'yup';
import displayMsg from '@/constants/displayMsg';
// import isEmail from 'isemail';
// import Filter from 'bad-words';

/* Email */
export const email = yup
  .string()
  .email(displayMsg.user.email.invalid)
  .max(255, displayMsg.user.email.length)
  .required(displayMsg.user.email.required);
// .label('email'),

/* Password */
export const password = yup
  .string()
  .min(passwordMinLength, displayMsg.user.password.short)
  .max(passwordMaxLength, displayMsg.user.password.long)
  .required(displayMsg.user.password.required);
// .label('password'),
