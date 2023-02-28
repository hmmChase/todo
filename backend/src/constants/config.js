/* Environments */

export const test = process.env.VERCEL_ENV === 'test';
export const preview = process.env.VERCEL_ENV === 'preview';
export const production = process.env.VERCEL_ENV === 'production';

export const development = !test || !preview || !production;

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

const frontendUrlLocal = 'http://localhost:1337';
const frontendUrlDev = 'https://hmmstart-git-dev-hmmchase.vercel.app/';
const frontendUrlPrev = 'https://hmmstart-git-preview-hmmchase.vercel.app';
const frontendUrlProd = 'https://hmmstart.vercel.app';

export const frontendUrl = development
  ? frontendUrlLocal
  : preview
  ? [frontendUrlDev, frontendUrlPrev]
  : production && frontendUrlProd;

export const backendUrl = process.env.VERCEL_URL;
