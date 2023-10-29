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
  sameSite: 'none', // Vercel subdomains are cross-site - https://publicsuffix.org/
  secure: true
  // sameParty: true, // allow cookies to be set by same origin
  // domain: development ? 'localhost' : '.vercel.app'
  // domain: '' //  hmmtodo-backend.vercel.app
  // domain: production ? `hmmtodo.vercel.app:${port}` : 'localhost'
  // expires: new Date(Date.now() + accessCookieExpiry * 1000),
  // path: '/gql', // use '/' if cookie not showing in chrome
};

export default accessCookieOptions;
