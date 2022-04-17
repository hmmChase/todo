import { passwordMaxLength, passwordMinLength } from './config';

const displayMessages = {
  error: 'Something went wrong',

  empty: 'Nothing to show',

  user: {
    null: 'No account found',
    exists: 'Email already in use',

    email: {
      required: 'Required',
      invalid: 'Invalid email',
      length: 'Must be 255 characters or less'
    },

    password: {
      required: 'Required',
      wrong: 'Wrong password',

      short: `Password must be at least ${passwordMinLength} characters.`,
      long: `Password must be no more than ${passwordMaxLength} characters.`,

      requirements: {
        title: 'Password must contain:',
        rules: [
          'at least 8 charactors',
          'an uppercase letter',
          'a lowercase letter',
          'a number'
        ]
      }
    },

    passReset: {
      expired:
        'Your password reset request is expired. Please submit a new one.',
      sent: 'Check your email for a password reset link.',
      success: 'Your password has been changed.',

      tokenMissing: 'Error: Please submit a new password reset request.',
      tokenExpired: 'Your reset request is expired. Please submit a new one.'
    }
  }
};

export default displayMessages;
