export const port = process.env.PORT || 4000;

const development = process.env.NODE_ENV === 'development';
const preview = process.env.VERCEL_ENV === 'preview';
export const production = process.env.VERCEL_ENV === 'production';

const frontendUrlDev = 'http://localhost:1337';
const frontendUrlPrev = 'https://hmm-start-git-dev-hmmchase.vercel.app';
const frontendUrlProd = 'https://hmm-start.vercel.app';

export const deployedUrl = process.env.VERCEL_URL;

export const frontendUrl = development
  ? frontendUrlDev
  : preview
  ? frontendUrlPrev
  : production && frontendUrlProd;

export const graphqlPath = '/gql';

const accessTokenExpiryTime = '1w';

export const JWToptions = { expiresIn: accessTokenExpiryTime };

export const passwordMinLength = 8;

export const passwordMaxLength = 30;

export const cryptoRandomBytesSize = 16;

export const passwordHashSaltRounds = 10;

export const resetPassTokenExpiryTime = Date.now() + 1000 * 60 * 60; // 1 hour
