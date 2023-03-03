import {
  // corsWhitelist,
  development,
  frontendUrl,
  preview,
  production
} from './config.js';

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
