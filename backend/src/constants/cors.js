import { apolloStudio, development, frontendUrl } from './config.js';

const CORSwhitelist = development ? [apolloStudio, frontendUrl] : frontendUrl;

export const corsOptions = { origin: CORSwhitelist, credentials: true };

console.log('development:', development);
console.log('corsOptions:', corsOptions);
