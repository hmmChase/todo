export const title = 'hmmStart';

export const graphqlUrlDev = 'http://localhost:6969/api/graphql';
export const graphqlUrlProd = 'https://hmmStart.now.sh/api/graphql';

export const refreshUrlDev = 'http://localhost:6969/api/refresh';
export const refreshUrlProd = 'https://hmmStart.now.sh/api/refresh';

export const ideasPerPage = 5;

export const usernameMinLength = 5;
export const usernameMaxLength = 30;

export const passwordMinLength = 8;
export const passwordMaxLength = 30;

export const debounceDelay = 200;

export const passwordRequirements = {
  title: 'Password must contain:',
  reqs: [
    'at least 8 charactors',
    'an uppercase letter',
    'a lowercase letter',
    'a number',
  ],
};

export const passResetTokenMissingError =
  'Error: Please submit a new password reset request.';
export const passResetTokenExpiredError =
  'Your reset request is expired. Please submit a new one.';
export const passResetSuccessful =
  'Your password has been successfully changed.';

export const passResetRequestSent = 'Check your email for a reset link.';
