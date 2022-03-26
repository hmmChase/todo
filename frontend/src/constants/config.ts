/* Environments */

// https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
export const development = process.env.NODE_ENV === 'development';
const preview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
const production = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

export const server = typeof window === 'undefined';

/* Settings */

export const siteTitle = 'hmmStart';

const backendUrlDev = 'http://localhost:8008';
const backendUrlPrev = 'https://hmmstart-backend-git-dev-hmmchase.vercel.app';
const backendUrlProd = 'https://hmmstart-backend.vercel.app';

export const backendUrl = development
  ? backendUrlDev
  : preview
  ? backendUrlPrev
  : production && backendUrlProd;

export const passwordMinLength = 8;
export const passwordMaxLength = 30;

export const ideasPerPage = 2;

export const IdeaInputDebounceDelay = 200;
