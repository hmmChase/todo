import jwt from 'jsonwebtoken';

const authenticate = cookie => {
  const secret = process.env.JWT_SECRET;
  const token = cookie.slice(6);

  try {
    jwt.verify(token, secret);

    return true;
  } catch {
    return false;
  }
};

const setCache = (cache, isAuthenticated) => {
  cache.writeData({
    data: {
      isLoggedIn: isAuthenticated
    }
  });
};

export default (cache, cookie) => {
  const isAuthenticated = cookie ? authenticate(cookie) : false;

  setCache(cache, isAuthenticated);
};
