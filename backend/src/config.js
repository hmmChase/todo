const production = process.env.NODE_ENV === 'production';

export const port = process.env.PORT || 4000;

const deployedUrl = process.env.VERCEL_URL;

const frontendUrlProd = 'https://hmm-start.vercel.app';

const frontendUrlDev = 'http://localhost:1337';

export const baseUrl = production ? frontendUrlProd : frontendUrlDev;

export const CORSwhitelist = production ? [baseUrl, deployedUrl] : baseUrl;

// http://expressjs.com/en/5x/api.html#res.cookie
export const cookieOptions = {
  maxAge: 365 * 52 * 7,
  expires: new Date(Date.now() + 365 * 52 * 7 * 1000),
  httpOnly: true,
  secure: production,
  path: '/',
  sameSite: production ? 'none' : 'strict',
  // sameSite: 'lax',
  // sameParty: false,
  domain: production ? '.vercel.app' : 'localhost'
};

export const accessTokenExpiryTime = '10m';

export const saltRounds = 10;

export const passwordMinLength = 8;
export const passwordMaxLength = 30;
