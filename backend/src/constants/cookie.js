// http://expressjs.com/en/5x/api.html#res.cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
// https://web.dev/same-site-same-origin/
// https://github.com/cfredric/sameparty

import {
  accessCookieExpiry
  // development
  // frontendUrl,
  // port
} from './config.js';

const accessCookieOptions = {
  httpOnly: true,
  maxAge: accessCookieExpiry,
  sameParty: true, // allow cookies to be set by same origin
  sameSite: 'none', // Vercel subdomains are cross-site - https://publicsuffix.org/
  secure: true
  // domain: development ? 'localhost' : '.vercel.app'
  // domain: '' //  hmmstart-backend.vercel.app
  // domain: production ? `hmmstart.vercel.app:${port}` : 'localhost'
  // expires: new Date(Date.now() + accessCookieExpiry * 1000),
  // path: '/gql', // use '/' if cookie not showing in chrome
};

export default accessCookieOptions;
