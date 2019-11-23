import jwt from 'jsonwebtoken';
import redirect from './redirect';
import { CURRENT_USER } from '../graphql/queries';

export default (req, res, pathname) => {
  if (req.headers.cookie) {
    const refreshToken = req.headers.cookie.replace('rt=', '');
    const secret = process.env.REFRESH_TOKEN_SECRET;

    try {
      jwt.verify(refreshToken, secret);

      // apolloClient.cache.writeData({ data: { isLoggedIn: true } });

      if (pathname === '/welcome') redirect(res, '/');
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
    query: CURRENT_USER
  });

  if (!loading && !error && data) {
    apolloClient.cache.writeData({ data: { isLoggedIn: true } });
  } else if (error) {
    apolloClient.cache.writeData({ data: { isLoggedIn: false } });
  }
};

export const checkLoggedIn = apolloClient => {
  apolloClient
    .query({
      query: gql`
        query getUser {
          user {
            id
            name
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
};

let accessToken = '';

export const setAccessToken = token => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;
