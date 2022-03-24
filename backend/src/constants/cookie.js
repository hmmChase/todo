// http://expressjs.com/en/5x/api.html#res.cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

import { accessCookieExpiry, production } from './config.js';

export const accessCookieOptions = {
  domain: '', //  hmmstart-backend.vercel.app
  httpOnly: true,
  maxAge: accessCookieExpiry,
  sameParty: true, // allow cookies to be set by same origin
  sameSite: production ? 'none' : 'strict', // production is cross-site
  secure: production
  // domain: production ? `hmmstart.vercel.app:${port}` : 'localhost'
  // expires: new Date(Date.now() + accessCookieExpiry * 1000),
  // path: '/gql', // use '/' if cookie not showing in chrome
};
