export const port = process.env.PORT || 4000;

const production =
  process.env.VERCEL_ENV === 'production'
    ? process.env.VERCEL_ENV
    : process.env.NODE_ENV === 'production';

const deployedUrl = process.env.VERCEL_URL;

const frontendUrlProd = 'https://hmm-start.vercel.app';

const frontendUrlDev = 'http://localhost:1337';

const CORSwhitelist = production
  ? [frontendUrlProd, `https://${deployedUrl}`]
  : [frontendUrlDev, 'https://studio.apollographql.com'];

export const corsOptions = { origin: CORSwhitelist, credentials: true };

export const graphqlPath = '/gql';

export const saltRounds = 10;

const accessTokenExpiryTime = '1w';

export const JWToptions = { expiresIn: accessTokenExpiryTime };

const cookieExpiry = 7 * 24 * 60 * 60 * 1000; // 1 week

// http://expressjs.com/en/5x/api.html#res.cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
export const cookieOptions = {
  maxAge: cookieExpiry,
  // expires: new Date(Date.now() + cookieExpiry),
  httpOnly: true,
  secure: production,
  sameSite: production ? 'none' : 'strict', // production is cross-site
  path: '/gql', // use '/' if cookie not showing in chrome
  domain: '', //  hmm-start-backend.vercel.app
  // domain: production ? `hmm-start.vercel.app:${port}` : 'localhost'
  sameParty: true // allow cookies to be set by same origin
};

export const passwordMinLength = 8;
export const passwordMaxLength = 30;
