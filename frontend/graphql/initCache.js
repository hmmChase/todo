import jwt from 'jsonwebtoken';
import { getAccessToken } from '../utils/accessToken';
import { accessTokenSecret } from '../constants';

const verifyAccessToken = accessToken => {
  try {
    jwt.verify(accessToken, accessTokenSecret);

    return true;
  } catch {
    return false;
  }
};

export default cache => {
  const accessToken = getAccessToken();
  console.log('initCache accessToken: ', accessToken);

  const isLoggedIn = verifyAccessToken(accessToken);

  cache.writeData({ id: 'isLoggedIn', data: { isLoggedIn } });
};
