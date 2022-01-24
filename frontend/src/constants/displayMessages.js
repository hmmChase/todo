import { passwordMinLength, passwordMaxLength } from './config';

const displayMessages = {
  user: {
    error: {
      user: {
        missing: 'Error, try again',
        invalid: 'Error, try again'
      },

      createUser: {
        exists: 'Incorrect email or password'
      },

      logIn: {
        notFound: 'Incorrect email or password'
      },

      passwordCompare: {
        notMatch: 'Incorrect password'
      },

      changePassword: {
        missing: 'Error, try again',
        notFound: 'Incorrect email or password'
      },

      validateEmail: {
        missing: 'Email is required',
        invalid: 'Error, try again'
      },

      isEmailWellFormed: {
        invalid: 'Email is invalid'
      },

      validatePassword: {
        missing: 'Password is required',
        invalid: 'Error, try again'
      },

      isPasswordWellFormed: {
        tooShort: `Password must be at least ${passwordMinLength} characters`,
        tooLong: `Password must be no more than ${passwordMaxLength} characters`
      },

      resetPass: {
        tokenExpired:
          'Your password reset request is expired. Please submit a new one'
      }
    },

    info: {},

    success: {
      ReqPassReset: 'Check your email for a password reset link',

      ResetPassword: 'Your password has been changed'
    }
  }
};

export default displayMessages;
