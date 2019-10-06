import jwt from 'jsonwebtoken';

export default (req, apolloClient) => {
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
