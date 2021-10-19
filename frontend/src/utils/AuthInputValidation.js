import * as yup from 'yup';
// import isEmail from 'isemail';
// import Filter from 'bad-words';

import {
  usernameMinLength,
  usernameMaxLength,
  passwordMinLength,
  passwordMaxLength
} from '../configs/config';

/* Username */

export const username = yup
  .string('Invalid username')
  .min(
    usernameMinLength,
    `Username must have at least ${usernameMinLength} characters`
  )
  .max(
    usernameMaxLength,
    `Username must have no more than ${usernameMaxLength} characters`
  )
  .required('Required');
// .label('username'),

/* Email */

export const email = yup
  .string('Invalid email')
  .email('Invalid email')
  .max(255, 'Must be 255 characters or less')
  .required('Required');
// .label('email'),

/* Password */

export const password = yup
  .string('Invalid password')
  .min(
    passwordMinLength,
    `Password must have at least ${passwordMinLength} characters`
  )
  .max(
    passwordMaxLength,
    `Password must have no more than ${passwordMaxLength} characters`
  )
  .required('Required');
// .label('password'),

/* Confirm Password */

export const confirmPassword = yup
  .string('Invalid password')
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  // .min(
  //   passwordMinLength,
  //   `Password must have at least ${passwordMinLength} characters`
  // )
  // .max(
  //   passwordMaxLength,
  //   `Password must have no more than ${passwordMaxLength} characters`
  // )
  .required('Required');
// .label('confirmPassword'),
