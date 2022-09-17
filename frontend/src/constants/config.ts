/* Environments */

export const development = process.env.NODE_ENV === 'development';
// https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
const preview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
const production = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

/* Settings */

export const siteTitle = 'hmmStart';

export const passwordMinLength = 8;
export const passwordMaxLength = 30;

export const ideasPerPage = 20;

export const IdeaInputDebounceDelay = 200;

/* URLs */

const backendUrlDev = 'http://localhost:8008';
const backendUrlPrev =
  'https://hmmstart-backend-git-preview-hmmchase.vercel.app';
const backendUrlProd = 'https://hmmstart-backend.vercel.app';

export const backendUrl = development
  ? backendUrlDev
  : preview
  ? backendUrlPrev
  : production && backendUrlProd;

export const gqlUri = `${backendUrl}/gql`;

/* Other */

export const server = typeof window === 'undefined';
