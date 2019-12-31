export const pageSize = 5;

export const title = 'Starter';

export const passwordRequirements = {
  title: 'Password must contain:',
  reqs: [
    'at least 8 charactors',
    'an uppercase letter',
    'a lowercase letter',
    'a number'
  ]
};

export const graphqlUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_GRAPHQL_URL
    : process.env.PROD_GRAPHQL_URL;

export const refreshUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_REFRESH_URL
    : process.env.PROD_REFRESH_URL;

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
