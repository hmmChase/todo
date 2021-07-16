const production = process.env.NODE_ENV === 'production';

export const siteTitle = 'hmmStart';

const backendUrlProd = 'https://hmm-start-backend.vercel.app';

const backendUrlDev = 'http://localhost:8008';

export const baseUrl = production ? backendUrlProd : backendUrlDev;
