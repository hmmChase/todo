// http://expressjs.com/en/5x/api.html#res.cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

import { production, cookieExpiry } from './config.js';

export const cookieOptions = {
  maxAge: cookieExpiry,
  // expires: new Date(Date.now() + cookieExpiry * 1000),
  httpOnly: true,
  secure: production,
  sameSite: production ? 'none' : 'strict', // production is cross-site
  // path: '/gql', // use '/' if cookie not showing in chrome
  domain: '', //  hmmstart-backend.vercel.app
  // domain: production ? `hmmstart.vercel.app:${port}` : 'localhost'
  sameParty: true // allow cookies to be set by same origin
};
