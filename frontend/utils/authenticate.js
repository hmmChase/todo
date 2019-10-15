import jwt from 'jsonwebtoken';
import { CURRENT_USER_QUERY } from '../graphql/queries';

export default (req, apolloClient) => {
  if (req.headers.cookie) {
    const refreshToken = req.headers.cookie.replace('rt=', '');
    const secret = process.env.REFRESH_TOKEN_SECRET;

    try {
      jwt.verify(refreshToken, secret);

      apolloClient.cache.writeData({ data: { isLoggedIn: true } });
    } catch (err) {
      apolloClient.cache.writeData({ data: { isLoggedIn: false } });
    }
  } else {
    apolloClient.cache.writeData({ data: { isLoggedIn: false } });
  }
};

export const graphQLAuth = async apolloClient => {
  const { loading, error, data } = await apolloClient.query({
    query: CURRENT_USER_QUERY
  });
  console.log('TCL: loading', loading);
  console.log('TCL: error', error);
  console.log('TCL: data', data);

  if (!loading && !error && data) {
    apolloClient.cache.writeData({ data: { isLoggedIn: true } });
  } else if (error) {
    apolloClient.cache.writeData({ data: { isLoggedIn: false } });
  }
};

let accessToken = '';

export const setAccessToken = token => {
  console.log('setAccessToken token: ', token);

  accessToken = token;
};

export const getAccessToken = () => accessToken;
