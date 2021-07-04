export const port = process.env.PORT || 4000;

const deployedUrl = process.env.VERCEL_URL;

const frontendUrlProd = 'https://hmmstart.vercel.app';

const frontendUrlDev = 'http://localhost:1337';

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? frontendUrlProd : frontendUrlDev;

export const CORSwhitelist =
  process.env.NODE_ENV === 'production' ? [BASE_URL, deployedUrl] : BASE_URL;
