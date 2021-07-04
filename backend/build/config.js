"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CORSwhitelist = exports.BASE_URL = exports.port = void 0;
var port = process.env.PORT || 4000;
exports.port = port;
var deployedUrl = process.env.VERCEL_URL;
var frontendUrlProd = 'https://hmmstart.vercel.app';
var frontendUrlDev = 'http://localhost:1337';
var BASE_URL = process.env.NODE_ENV === 'production' ? frontendUrlProd : frontendUrlDev;
exports.BASE_URL = BASE_URL;
var CORSwhitelist = process.env.NODE_ENV === 'production' ? [BASE_URL, deployedUrl] : BASE_URL;
exports.CORSwhitelist = CORSwhitelist;
//# sourceMappingURL=config.js.map