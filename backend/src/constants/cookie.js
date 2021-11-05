// http://expressjs.com/en/5x/api.html#res.cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

import { production } from './config';

const cookieExpiry = 7 * 24 * 60 * 60 * 1000; // 1 week

export const cookieOptions = {
  maxAge: cookieExpiry,
  // expires: new Date(Date.now() + cookieExpiry * 1000),
  httpOnly: true,
  secure: production,
  sameSite: production ? 'none' : 'strict', // production is cross-site
  // path: '/gql', // use '/' if cookie not showing in chrome
  domain: '', //  hmm-start-backend.vercel.app
  // domain: production ? `hmm-start.vercel.app:${port}` : 'localhost'
  sameParty: true // allow cookies to be set by same origin
};
