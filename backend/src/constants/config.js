/* Environments */

export const development = process.env.NODE_ENV === 'development';
export const preview = process.env.VERCEL_ENV === 'preview';
export const production = process.env.VERCEL_ENV === 'production';

/* Settings */

export const port = process.env.PORT || 4000;

export const graphqlPath = '/gql';

export const passwordMinLength = 8;
export const passwordMaxLength = 30;

export const passwordHashSaltRounds = 10;

export const passwordResetTokenBytesSize = 16;

export const accessTokenExpiry = '1w';

export const accessCookieExpiry = 7 * 24 * 60 * 60 * 1000; // 1 week

export const passResetExpiry = new Date(
  Date.now() + 1000 * 60 * 60
).toISOString(); // 1 hour from now

/* URLs */

const frontendUrlDev = 'http://localhost:1337';
const frontendUrlPrev = 'https://hmmstart-git-preview-hmmchase.vercel.app';
const frontendUrlProd = 'https://hmmstart.vercel.app';

export const frontendUrl = development
  ? frontendUrlDev
  : preview
  ? frontendUrlPrev
  : production && frontendUrlProd;

export const backendUrl = process.env.VERCEL_URL;
