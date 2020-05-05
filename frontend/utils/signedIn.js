import jwt from 'jsonwebtoken';

export default (req) => {
  // if (typeof window === 'undefined') {

  // If cookie header present
  if (req && req.headers && req.headers.cookie) {
    // Parse Refresh token
    const refreshToken = req.headers.cookie.replace('rt=', '');

    // If Refresh token
    if (refreshToken) {
      try {
        // Verify Refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        return true;
      } catch (error) {
        // If Refresh token invalid
        console.error('Refresh token verify error: ', error);
      }
    }
  }

  // }
};
