import jwt from 'jsonwebtoken';
// import redirect from './redirect';

export default (apolloClient, cookie) => {
  const token = cookie.slice(6);
  const secret = process.env.JWT_SECRET;

  try {
    jwt.verify(token, secret);

    apolloClient.cache.writeData({ data: { isLoggedIn: true } });
  } catch (err) {
    console.warn('jwt verify err', err);

    apolloClient.cache.writeData({ data: { isLoggedIn: false } });
  }
};
