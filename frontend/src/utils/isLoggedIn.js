import jwt from 'jsonwebtoken';

const isLoggedIn = headers => {
  const secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

  // If cookie header present
  if (headers && headers.cookie) {
    // Parse Access token
    const accessToken = headers.cookie.replace('at=', '');

    // If Access token
    if (accessToken) {
      try {
        // Decode payload if signature is valid and JWT not expired
        jwt.verify(accessToken, secret);

        return true;
      } catch {
        return false;
      }
    }
  }

  return false;
};

export default isLoggedIn;
