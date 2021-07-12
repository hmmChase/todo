"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordMaxLength = exports.passwordMinLength = exports.saltRounds = exports.accessTokenExpiryTime = exports.COOKIE_CONFIG = exports.CORSwhitelist = exports.BASE_URL = exports.port = void 0;
var production = process.env.NODE_ENV === 'production';
var port = process.env.PORT || 4000;
exports.port = port;
var deployedUrl = process.env.VERCEL_URL;
var frontendUrlProd = 'https://hmm-start.vercel.app';
var frontendUrlDev = 'http://localhost:1337';
var BASE_URL = production ? frontendUrlProd : frontendUrlDev;
exports.BASE_URL = BASE_URL;
var CORSwhitelist = production ? [BASE_URL, deployedUrl] : BASE_URL;
exports.CORSwhitelist = CORSwhitelist;
var COOKIE_CONFIG = {
  maxAge: 365 * 52 * 7 * 24 * 60,
  httpOnly: production,
  secure: production,
  sameSite: production ? 'none' : 'strict' // domain: 'vercel.app',
  // sameParty: false
  // path: '/',

};
exports.COOKIE_CONFIG = COOKIE_CONFIG;
var accessTokenExpiryTime = '10m';
exports.accessTokenExpiryTime = accessTokenExpiryTime;
var saltRounds = 10;
exports.saltRounds = saltRounds;
var passwordMinLength = 8;
exports.passwordMinLength = passwordMinLength;
var passwordMaxLength = 30;
exports.passwordMaxLength = passwordMaxLength;
//# sourceMappingURL=config.js.map