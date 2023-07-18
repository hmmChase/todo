import { passwordMaxLength, passwordMinLength } from '@/constants/config';

const displayMsg = {
  error: 'ERROR',
  // null: 'NULL',

  user: {
    email: {
      notFound: 'Email not found',
      exists: 'Email already used',

      required: 'Email required',
      invalid: 'Invalid email',
      length: 'Must be 255 characters or less'

      // null: 'Account found',

      // unauthenticated: 'Unauthenticated',
      // unauthorized: 'Unauthorized'
    },

    password: {
      wrong: 'Wrong password',

      required: 'Password required',
      tooShort: `Password must be at least ${passwordMinLength} characters`,
      tooLong: `Password must be no more than ${passwordMaxLength} characters`,

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
      sent: 'Check your email for a password reset link.',
      success: 'Your password has been changed.',
      tokenMissing: 'Error: Please submit a new password reset request.',
      tokenExpired:
        'Error: Your reset request is expired. Please submit a new one.'
    },

    passResetToken: {
      expired: 'Expired password reset token',
      invalid: 'Invalid password reset token'
    }
  },

  idea: {
    noIdeas: 'No ideas'
  }
};

export default displayMsg;
