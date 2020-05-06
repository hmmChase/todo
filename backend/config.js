export const port = 6969;

export const accessTokenExpiryTime = '10m';

export const refreshTokenExpiryTime = '7d';
export const refreshTokenCookieMaxAge = 1000 * 60 * 60 * 24 * 7; // 1 week

export const resetTokenExpiryTime = 3600000; // 1 hour

export const saltRounds = 10;

export const usernameMinLength = 5;
export const usernameMaxLength = 30;

export const mailHost = 'smtp.mailtrap.io';
export const mailPort = '2525';

export const frontendUrlDev = 'http://localhost:8008';
export const frontendUrlProd =
  'https://next-graphql-starter-base.now.sh.hmmchase.now.sh';
