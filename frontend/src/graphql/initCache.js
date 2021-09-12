import jwt from 'jsonwebtoken';
import { getAccessToken } from '../utils/accessToken';
import { IS_LOGGED_IN } from './queries';

const verifyAccessToken = accessToken => {
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    return true;
  } catch {
    return false;
  }
};

export default (cache, accessToken) => {
  const theAccessToken = accessToken || getAccessToken();

  let isLoggedIn = false;

  if (theAccessToken) isLoggedIn = verifyAccessToken(theAccessToken);

  cache.writeQuery({
    id: 'isLoggedIn',
    query: IS_LOGGED_IN,
    data: { isLoggedIn }
  });
};
