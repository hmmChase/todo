export const siteTitle = 'hmmStart';

const backendUrlProd = 'https://hmmstart-backend.vercel.app';

const backendUrlDev = 'http://localhost:8008';

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? backendUrlProd : backendUrlDev;
