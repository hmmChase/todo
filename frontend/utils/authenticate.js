import jwt from 'jsonwebtoken';
import { CURRENT_USER_QUERY } from '../graphql/queries';

export const cookieAuth = (req, apolloClient) => {
  if (req.headers.cookie) {
    const token = req.headers.cookie.replace('token=', '');
    const secret = process.env.JWT_SECRET;

    try {
      jwt.verify(token, secret);

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
