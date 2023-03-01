import { corsWhitelist } from './config.js';

// https://www.npmjs.com/package/cors#configuring-cors-w-dynamic-origin

export const corsOptions = {
  origin: function (origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  credentials: true
};
