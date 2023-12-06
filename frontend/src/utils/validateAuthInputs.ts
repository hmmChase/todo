import * as yup from 'yup';
// import Filter from 'bad-words';
// import isEmail from 'isemail';

import { passwordMaxLength, passwordMinLength } from '@/constants/config';
import displayMsg from '@/constants/displayMsg';

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
  .min(passwordMinLength, displayMsg.user.password.tooShort)
  .max(passwordMaxLength, displayMsg.user.password.tooLong)
  .required(displayMsg.user.password.required);
// .label('password'),
