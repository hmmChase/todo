const production = process.env.NODE_ENV === 'production';

export const port = process.env.PORT || 4000;

const deployedUrl = process.env.VERCEL_URL;

const frontendUrlProd = 'https://hmm-start.vercel.app';

const frontendUrlDev = 'http://localhost:1337';

export const BASE_URL = production ? frontendUrlProd : frontendUrlDev;

export const CORSwhitelist = production ? [BASE_URL, deployedUrl] : BASE_URL;

export const COOKIE_CONFIG = {
  maxAge: 365 * 52 * 7 * 24 * 60,
  httpOnly: production,
  secure: production,
  sameSite: production ? 'none' : 'strict'
  // domain: 'vercel.app',
  // sameParty: false
  // path: '/',
};

export const accessTokenExpiryTime = '10m';

export const saltRounds = 10;

export const passwordMinLength = 8;
export const passwordMaxLength = 30;
