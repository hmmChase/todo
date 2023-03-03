/* Environments */

export const development = process.env.NODE_ENV === 'development';
export const preview = process.env.VERCEL_ENV === 'preview'; // work branch deploys, NODE_ENV = 'production'
export const production = process.env.VERCEL_ENV === 'production'; // main branch deploy, NODE_ENV = 'production'

/* Settings */

export const passwordMinLength = 8;
export const passwordMaxLength = 30;

export const passHashSaltRounds = 10;

export const passResetTokenBytes = 16;

export const passResetExpiry = new Date(
  Date.now() + 1000 * 60 * 60
).toISOString(); // 1 hour from now

export const accessTokenExpiry = '1w';

export const accessCookieExpiry = 7 * 24 * 60 * 60 * 1000; // 1 week

/* URLs */

export const port = process.env.PORT || 4000;

export const graphqlPath = '/gql';

const gitBranch = process.env.VERCEL_GIT_COMMIT_REF;
const gitOwner = process.env.VERCEL_GIT_REPO_OWNER;

const apolloStudio = 'https://studio.apollographql.com';

const frontendUrlDev = 'http://localhost:1337';
// const frontendUrlPrev = `https://hmmstart-git-${gitBranch}-${gitOwner}.vercel.app`;
// const frontendUrlPrev = 'https://hmmstart-git-dev-hmmchase.vercel.app';
const frontendUrlPrev = 'https://hmmstart-git-dev-hmmChase.vercel.app';
const frontendUrlProd = 'https://hmmstart.vercel.app';

const backendUrlDev = 'http://localhost:8008';
const backendUrlVercel = process.env.VERCEL_URL;

export const frontendUrl = development
  ? frontendUrlDev
  : preview
  ? frontendUrlPrev
  : production && frontendUrlProd;

export const backendUrl = development ? backendUrlDev : backendUrlVercel;

export const corsWhitelist = development
  ? [frontendUrlDev, apolloStudio]
  : [frontendUrlPrev, frontendUrlProd];
