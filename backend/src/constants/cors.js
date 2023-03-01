import {
  // corsWhitelist,
  development,
  preview,
  production
} from './config.js';

const frontendUrlDev = 'http://localhost:1337';
const frontendUrlPrev = 'https://hmmstart-git-dev-hmmchase.vercel.app';
const frontendUrlProd = 'https://hmmstart.vercel.app';

export const frontendUrl = development
  ? frontendUrlDev
  : preview
  ? frontendUrlPrev
  : production && frontendUrlProd;

// https://www.npmjs.com/package/cors#configuring-cors-w-dynamic-origin

const corsDev = [frontendUrl, 'https://studio.apollographql.com'];
const corsPrev = [frontendUrl];
const corsProd = [frontendUrl];

const CORSwhitelist = development
  ? corsDev
  : preview
  ? corsPrev
  : production && corsProd;

export const corsOptions = { origin: CORSwhitelist, credentials: true };

// export const corsOptions = {
//   origin: function (origin, callback) {
//     if (corsWhitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },

//   credentials: true
// };
