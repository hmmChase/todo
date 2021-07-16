"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordMaxLength = exports.passwordMinLength = exports.saltRounds = exports.accessTokenExpiryTime = exports.cookieOptions = exports.CORSwhitelist = exports.baseUrl = exports.port = void 0;
var production = process.env.NODE_ENV === 'production';
var port = process.env.PORT || 4000;
exports.port = port;
var deployedUrl = process.env.VERCEL_URL;
console.log('deployedUrl:', deployedUrl);
var frontendUrlProd = 'https://hmm-start.vercel.app';
var frontendUrlDev = 'http://localhost:1337';
var baseUrl = production ? frontendUrlProd : frontendUrlDev;
exports.baseUrl = baseUrl;
var CORSwhitelist = production ? [baseUrl, deployedUrl] : baseUrl;
exports.CORSwhitelist = CORSwhitelist;
var cookieExpiry = 365 * 52 * 7 * 24 * 60 * 60; // 2.21 days
// http://expressjs.com/en/5x/api.html#res.cookie

var cookieOptions = {
  maxAge: cookieExpiry,
  expires: new Date(Date.now() + cookieExpiry),
  httpOnly: true,
  secure: production,
  path: '/',
  sameSite: production ? 'lax' : 'strict' // sameSite: 'lax',
  // sameParty: false,
  // domain: production ? '.vercel.app' : 'localhost'

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