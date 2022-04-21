// http://expressjs.com/en/5x/api.html#res.cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

import { accessCookieExpiry, development } from './config.js';

const accessCookieOptions = {
  httpOnly: true,
  maxAge: accessCookieExpiry,
  sameParty: true, // allow cookies to be set by same origin
  sameSite: !development ? 'none' : 'strict', // deployed frontend/backend is cross-site
  secure: !development,
  domain: '' //  hmmstart-backend.vercel.app
  // domain: production ? `hmmstart.vercel.app:${port}` : 'localhost'
  // expires: new Date(Date.now() + accessCookieExpiry * 1000),
  // path: '/gql', // use '/' if cookie not showing in chrome
};

export default accessCookieOptions;
