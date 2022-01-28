export const siteTitle = 'hmmStart';

// https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
const development = process.env.NODE_ENV === 'development';
const preview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
const production = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

const backendUrlDev = 'http://localhost:8008';
const backendUrlPrev = 'https://hmm-start-backend-git-dev-hmmchase.vercel.app';
const backendUrlProd = 'https://hmm-start-backend.vercel.app';

export const backendUrl = development
  ? backendUrlDev
  : preview
  ? backendUrlPrev
  : production && backendUrlProd;

export const ideasPerPage = 2;

export const IdeaInputDebounceDelay = 200;

export const usernameMinLength = 5;
export const usernameMaxLength = 30;

export const passwordMinLength = 8;
export const passwordMaxLength = 30;

export const passwordRequirements = {
  title: 'Password must contain:',
  reqs: [
    'at least 8 charactors',
    'an uppercase letter',
    'a lowercase letter',
    'a number'
  ]
};

export const passResetTokenMissingError =
  'Error: Please submit a new password reset request.';
export const passResetTokenExpiredError =
  'Your reset request is expired. Please submit a new one.';
