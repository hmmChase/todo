// import isEmail from 'isemail';
// import Filter from 'bad-words';
import * as yup from 'yup';
import {
  usernameMinLength,
  usernameMaxLength,
  passwordMinLength,
  passwordMaxLength,
} from '../config';

/* Username */

export const username = {
  username: yup
    .string('Invalid username')
    .min(
      usernameMinLength,
      `Username must have at least ${usernameMinLength} characters`
    )
    .max(
      usernameMaxLength,
      `Username must have no more than ${usernameMaxLength} characters`
    )
    .required('Required'),
  // .label('username'),
};

/* Email */

export const email = {
  email: yup
    .string('Invalid email')
    .email('Invalid email')
    .max(255, 'Must be 255 characters or less')
    .required('Required'),
  // .label('email'),
};

/* Password */

export const password = {
  password: yup
    .string('Invalid password')
    .min(
      passwordMinLength,
      `Password must have at least ${passwordMinLength} characters`
    )
    .max(
      passwordMaxLength,
      `Password must have no more than ${passwordMaxLength} characters`
    )
    .required('Required'),
  // .label('password'),
};

/* Confirm Password */

export const confirmPassword = {
  password: yup
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
    .required('Required'),
  // .label('confirmPassword'),
};
