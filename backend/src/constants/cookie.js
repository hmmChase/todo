// http://expressjs.com/en/5x/api.html#res.cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

import {
  accessCookieExpiry,
  development,
  frontendUrl,
  port
} from './config.js';

console.log('`${frontendUrl}:${port}`:', `${frontendUrl}:${port}`);

const accessCookieOptions = {
  httpOnly: true,
  maxAge: accessCookieExpiry,
  sameParty: true, // allow cookies to be set by same origin
  sameSite: development ? 'strict' : 'none', // deployed frontend/backend is cross-site
  secure: !development,
  // domain: '' //  hmmstart-backend.vercel.app
  // domain: production ? `hmmstart.vercel.app:${port}` : 'localhost'
  domain: development ? 'localhost' : 'vercel.app'
  // expires: new Date(Date.now() + accessCookieExpiry * 1000),
  // path: '/gql', // use '/' if cookie not showing in chrome
};

export default accessCookieOptions;
