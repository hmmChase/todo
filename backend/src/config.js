const production =
  process.env.VERCEL_ENV === 'production'
    ? process.env.VERCEL_ENV
    : process.env.NODE_ENV === 'production';

export const port = process.env.PORT || 4000;

const deployedUrl = process.env.VERCEL_URL;

const frontendUrlProd = 'https://hmm-start.vercel.app';

const frontendUrlDev = 'http://localhost:1337';

export const CORSwhitelist = production
  ? [frontendUrlProd, `https://${deployedUrl}`]
  : frontendUrlDev;

const cookieExpiry = 7 * 24 * 60 * 60 * 1000; // 1 week

// http://expressjs.com/en/5x/api.html#res.cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
export const cookieOptions = {
  maxAge: cookieExpiry,
  expires: new Date(Date.now() + cookieExpiry),
  httpOnly: true,
  secure: production,
  sameSite: production ? 'none' : 'strict', // production is cross-site
  path: '/gql',
  domain: '' //  hmm-start-backend.vercel.app
  // domain: production ? `hmm-start.vercel.app:${port}` : 'localhost'
  // sameParty: false,
};

export const accessTokenExpiryTime = '10m';

export const saltRounds = 10;

export const passwordMinLength = 8;
export const passwordMaxLength = 30;
