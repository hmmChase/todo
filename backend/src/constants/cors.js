import { frontendUrl, production } from './config.js';

const corsDev = [frontendUrl, 'https://studio.apollographql.com'];
const corsPrev = [frontendUrl];
const corsProd = [frontendUrl];

const CORSwhitelist = development
  ? corsDev
  : preview
  ? corsPrev
  : production && corsProd;

export const corsOptions = { origin: CORSwhitelist, credentials: true };
