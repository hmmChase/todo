import { passwordMinLength, passwordMaxLength } from '../config';

const displayMessages = {
  idea: {},

  user: {
    auth: {
      missing: 'Please enter your email and password.',

      invalid: 'Invalid email or password.',

      alreadyExists: 'Account matching supplied email already exists.',

      passwordShort: `Password must be at least ${passwordMinLength} characters`,

      passwordLong: `Password must be no more than ${passwordMaxLength} characters`
    },

    resetPass: {
      tokenError: 'Token error: Please submit a new password reset request.',

      tokenExpired:
        'Your password reset request is expired. Please submit a new one.',

      reqSent: 'Please check your email for a password reset link.',

      success: 'Your password has been successfully changed.'
    }
  }
};

export default displayMessages;
