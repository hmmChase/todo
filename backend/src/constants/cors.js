import {
  frontendUrlProd,
  frontendUrlDev,
  deployedUrl,
  production
} from './config.js';

const CORSwhitelist = production
  ? [frontendUrlProd, `https://${deployedUrl}`]
  : [frontendUrlDev, 'https://studio.apollographql.com'];

console.log('CORSwhitelist:', CORSwhitelist);

export const corsOptions = { origin: CORSwhitelist, credentials: true };
