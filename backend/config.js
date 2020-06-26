export const port = 6969;

export const accessTokenExpiryTime = '10m';

export const refreshTokenExpiryTime = '7d';
export const refreshTokenCookieMaxAge = 1000 * 60 * 60 * 24 * 7; // 1 week

export const resetTokenExpiryTime = 3600000; // 1 hour

export const saltRounds = 10;

export const usernameMinLength = 5;
export const usernameMaxLength = 30;

export const passwordMinLength = 8;
export const passwordMaxLength = 30;

export const mailHost = 'smtp.mailtrap.io';
export const mailPort = '2525';

export const prodUrl = process.env.VERCEL_URL;

export const frontendUrlDev = 'http://localhost:8008';
export const frontendUrlProd = `https://${prodUrl}`;

export const frontendUrlCORS = [
  'https://hmmstart.vercel.app',
  'https://hmmstart-git-dev.hmmchase.vercel.app',
  'https://hmmstart-git-base.hmmchase.vercel.app',
  frontendUrlProd,
];

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.VERCEL_URL', process.env.VERCEL_URL);
console.log('process.env.HOST', process.env.HOST);

// const URL = req.headers['x-now-deployment-url'];
