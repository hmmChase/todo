"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordMaxLength = exports.passwordMinLength = exports.cookieOptions = exports.options = exports.saltRounds = exports.graphqlPath = exports.corsOptions = exports.port = void 0;
var port = process.env.PORT || 4000;
exports.port = port;
var production = process.env.VERCEL_ENV === 'production' ? process.env.VERCEL_ENV : process.env.NODE_ENV === 'production';
var deployedUrl = process.env.VERCEL_URL;
var frontendUrlProd = 'https://hmm-start.vercel.app';
var frontendUrlDev = 'http://localhost:1337';
var CORSwhitelist = production ? [frontendUrlProd, "https://".concat(deployedUrl)] : [frontendUrlDev, 'https://studio.apollographql.com'];
var corsOptions = {
  origin: CORSwhitelist,
  credentials: true
};
exports.corsOptions = corsOptions;
var graphqlPath = '/gql';
exports.graphqlPath = graphqlPath;
var saltRounds = 10;
exports.saltRounds = saltRounds;
var accessTokenExpiryTime = '1w';
var options = {
  expiresIn: accessTokenExpiryTime
};
exports.options = options;
var cookieExpiry = 7 * 24 * 60 * 60 * 1000; // 1 week
// http://expressjs.com/en/5x/api.html#res.cookie
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

var cookieOptions = {
  maxAge: cookieExpiry,
  // expires: new Date(Date.now() + cookieExpiry),
  httpOnly: true,
  secure: production,
  sameSite: production ? 'none' : 'strict',
  // production is cross-site
  path: '/gql',
  // use '/' if cookie not showing in chrome
  domain: '',
  //  hmm-start-backend.vercel.app
  // domain: production ? `hmm-start.vercel.app:${port}` : 'localhost'
  sameParty: true // allow cookies to be set by same origin

};
exports.cookieOptions = cookieOptions;
var passwordMinLength = 8;
exports.passwordMinLength = passwordMinLength;
var passwordMaxLength = 30;
exports.passwordMaxLength = passwordMaxLength;
//# sourceMappingURL=config.js.map