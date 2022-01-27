import { production, frontendUrl, deployedUrl } from './config.js';

const CORSwhitelist = production
  ? [frontendUrl, `https://${deployedUrl}`]
  : [frontendUrl, 'https://studio.apollographql.com'];

export const corsOptions = { origin: CORSwhitelist, credentials: true };
