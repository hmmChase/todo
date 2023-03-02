/* Environments */

export const development = process.env.NODE_ENV === 'development';
const preview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'; // work branch deploys, NODE_ENV = 'production'
const production = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'; // main branch deploy, NODE_ENV = 'production'

export const server = typeof window === 'undefined';

/* Settings */

export const siteTitle = 'hmmStart';

export const passwordMinLength = 8;
export const passwordMaxLength = 30;

export const ideasPerPage = 20;

export const IdeaInputDebounceDelay = 200;

/* URLs */

const gitBranch = process.env.VERCEL_GIT_COMMIT_REF;
const gitOwner = process.env.VERCEL_GIT_REPO_OWNER;

const backendUrlDev = 'http://localhost:8008';
const backendUrlPrev = `https://hmmstart-backend-git-${gitBranch}-${gitOwner}.vercel.app`;
const backendUrlProd = 'https://hmmstart-backend.vercel.app';

export const backendUrl = development
  ? backendUrlDev
  : preview
  ? backendUrlPrev
  : production && backendUrlProd;

export const gqlUri = `${backendUrl}/gql`;
