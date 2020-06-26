export const title = 'hmmStart';

export const prodUrl = process.env.VERCEL_URL;

export const graphqlUrlDev = 'http://localhost:6969/api/graphql';
export const graphqlUrlProd = `https://${prodUrl}/api/graphql`;

export const refreshUrlDev = 'http://localhost:6969/api/refresh';
export const refreshUrlProd = `https://${prodUrl}/api/refresh`;

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

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

export const passResetRequestSent = 'Check your email for a reset link.';
export const passResetSuccessful =
  'Your password has been successfully changed.';
