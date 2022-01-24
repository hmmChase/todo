import {
  frontendUrlProd,
  frontendUrlDev,
  deployedUrl,
  production
} from './config.js';

const CORSwhitelist = production
  ? [frontendUrlProd, `https://${deployedUrl}`]
  : [frontendUrlDev, 'https://studio.apollographql.com'];

export const corsOptions = { origin: CORSwhitelist, credentials: true };
