import jwt from 'jsonwebtoken';

import redirect from './redirect';
import { CURRENT_USER_QUERY } from '../graphql/queries';

export default (req, res, pathname, apolloClient) => {
  if (req.headers.cookie) {
    const refreshToken = req.headers.cookie.replace('rt=', '');
    const secret = process.env.REFRESH_TOKEN_SECRET;

    try {
      jwt.verify(refreshToken, secret);

      // apolloClient.cache.writeData({ data: { isLoggedIn: true } });

      // if (pathname !== '/') redirect(res, '/');
    } catch (err) {
      // apolloClient.cache.writeData({ data: { isLoggedIn: false } });

      if (pathname !== '/welcome') redirect(res, '/welcome');
    }
  } else if (pathname !== '/welcome') {
    // apolloClient.cache.writeData({ data: { isLoggedIn: false } });

    redirect(res, '/welcome');
  }
};

export const graphQLAuth = async apolloClient => {
  const { loading, error, data } = await apolloClient.query({
    query: CURRENT_USER_QUERY
  });

  if (!loading && !error && data) {
    apolloClient.cache.writeData({ data: { isLoggedIn: true } });
  } else if (error) {
    apolloClient.cache.writeData({ data: { isLoggedIn: false } });
  }
};

let accessToken = '';

export const setAccessToken = token => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;
