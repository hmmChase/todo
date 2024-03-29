// https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser

/* Environments */

export const development = process.env.NODE_ENV === 'development';
const preview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'; // work branch deploys, NODE_ENV = 'production'
const production = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'; // main branch deploy, NODE_ENV = 'production'

export const server = typeof window === 'undefined';

/* Settings */

export const siteTitle = 'ToDo';

export const passwordMinLength = 8;
export const passwordMaxLength = 30;

export const tasksPerPage = 20;

export const TaskInputDebounceDelay = 200;

/* URLs */

const gitBranch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
const gitOwner = process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER;

const backendUrlDev = 'http://localhost:8008';
const backendUrlPrev = `https://todo-backend-git-${gitBranch}-${gitOwner}.vercel.app`;
const backendUrlProd = 'https://hmmtodo-backend.vercel.app';

export const backendUrl = development
  ? backendUrlDev
  : preview
  ? backendUrlPrev
  : production && backendUrlProd;

export const gqlUri = `${backendUrl}/gql`;
