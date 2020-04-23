export const pageSize = 5;

export const title = 'Starter';

export const passwordRequirements = {
  title: 'Password must contain:',
  reqs: [
    'at least 8 charactors',
    'an uppercase letter',
    'a lowercase letter',
    'a number',
  ],
};
export const graphqlUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:6969/api/graphql'
    : 'https://lhkfjdsaoir.now.sh/api/graphql';

export const refreshUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:6969/api/refresh'
    : 'https://lhkfjdsaoir.now.sh/api/refresh';

export const accessTokenSecret = 'terhjzrthjshjfg';

export const refreshTokenSecret = 'hethearhaehr';
