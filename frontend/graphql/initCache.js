import jwt from 'jsonwebtoken';
import { getAccessToken } from '../utils/accessToken';

const verifyAccessToken = accessToken => {
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    return true;
  } catch {
    return false;
  }
};

export default cache => {
  const accessToken = getAccessToken();

  const isAuthenticated = verifyAccessToken(accessToken);

  cache.writeData({ data: { isLoggedIn: isAuthenticated } });
};
