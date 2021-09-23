const production = process.env.NODE_ENV === 'production';

export const siteTitle = 'hmmStart';

const backendUrlProd = 'https://hmm-start-backend.vercel.app';

const backendUrlDev = 'http://localhost:8008';

export const baseUrl = production ? backendUrlProd : backendUrlDev;

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
