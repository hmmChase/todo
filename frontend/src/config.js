export const siteTitle = 'hmmStart2';

const backendUrlProd = 'https://hmm-start2-backend.vercel.app';

const backendUrlDev = 'http://localhost:8008';

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? backendUrlProd : backendUrlDev;
