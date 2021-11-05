export const port = process.env.PORT || 4000;

export const frontendUrlProd = 'https://hmm-start.vercel.app';

export const frontendUrlDev = 'http://localhost:1337';

export const deployedUrl = process.env.VERCEL_URL;

export const frontendUrl =
  process.env.NODE_ENV === 'production' ? frontendUrlProd : frontendUrlDev;

export const production =
  process.env.VERCEL_ENV === 'production'
    ? process.env.VERCEL_ENV
    : process.env.NODE_ENV === 'production';

export const graphqlPath = '/gql';

export const passwordHashSaltRounds = 10;

const accessTokenExpiryTime = '1w';

export const JWToptions = { expiresIn: accessTokenExpiryTime };

export const passwordMinLength = 8;
export const passwordMaxLength = 30;

export const cryptoRandomBytesSize = 16;

export const resetPassTokenExpiryTime = Date.now() + 1000 * 60 * 60; // 1 hour
