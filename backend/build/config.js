"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordMaxLength = exports.passwordMinLength = exports.saltRounds = exports.accessTokenExpiryTime = exports.cookieOptions = exports.CORSwhitelist = exports.port = void 0;
var production = process.env.VERCEL_ENV === 'production' ? process.env.VERCEL_ENV : process.env.NODE_ENV === 'production';
var port = process.env.PORT || 4000;
exports.port = port;
var deployedUrl = process.env.VERCEL_URL;
var frontendUrlProd = 'https://hmm-start.vercel.app';
var frontendUrlDev = 'http://localhost:1337';
var CORSwhitelist = production ? [frontendUrlProd, "https://".concat(deployedUrl)] : frontendUrlDev;
exports.CORSwhitelist = CORSwhitelist;
var cookieExpiry = 7 * 24 * 60 * 60 * 1000; // 1 week
// http://expressjs.com/en/5x/api.html#res.cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

var cookieOptions = {
  maxAge: cookieExpiry,
  expires: new Date(Date.now() + cookieExpiry),
  httpOnly: true,
  secure: production,
  sameSite: production ? 'none' : 'strict',
  // production is cross-site
  path: '/gql',
  domain: '' //  hmm-start-backend.vercel.app
  // domain: production ? `hmm-start.vercel.app:${port}` : 'localhost'
  // sameParty: false,

};
exports.cookieOptions = cookieOptions;
var accessTokenExpiryTime = '10m';
exports.accessTokenExpiryTime = accessTokenExpiryTime;
var saltRounds = 10;
exports.saltRounds = saltRounds;
var passwordMinLength = 8;
exports.passwordMinLength = passwordMinLength;
var passwordMaxLength = 30;
exports.passwordMaxLength = passwordMaxLength;
//# sourceMappingURL=config.js.map