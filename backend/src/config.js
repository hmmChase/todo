const production = process.env.NODE_ENV === 'production';

export const port = process.env.PORT || 4000;

const deployedUrl = process.env.VERCEL_URL;

const frontendUrlProd = 'https://hmm-start.vercel.app';

const frontendUrlDev = 'http://localhost:1337';

export const BASE_URL = production ? frontendUrlProd : frontendUrlDev;

export const CORSwhitelist = production ? [BASE_URL, deployedUrl] : BASE_URL;

export const COOKIE_CONFIG = {
  maxAge: 365 * 52 * 7,
  expires: new Date(Date.now() + 365 * 52 * 7 * 1000),
  httpOnly: true,
  secure: production,
  path: '/',
  sameSite: production ? 'none' : 'strict'
  // sameSite: 'lax',
  // sameParty: false,
  // domain: 'vercel.app',
};

export const accessTokenExpiryTime = '10m';

export const saltRounds = 10;

export const passwordMinLength = 8;
export const passwordMaxLength = 30;
