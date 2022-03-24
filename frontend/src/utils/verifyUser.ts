import jwt from 'jsonwebtoken';

import { User } from '../models';

interface JwtPayload {
  user: User;
}

const verifyUser = (userCookie: string | undefined) => {
  const secret = Buffer.from(
    process.env.ACCESS_TOKEN_SECRET as string,
    'base64'
  );

  // If cookie header present
  if (userCookie) {
    // Parse Access token
    const accessToken = userCookie.replace('access=', '');

    // If Access token
    if (accessToken) {
      try {
        // Decode payload if signature is valid and JWT not expired
        const { user } = jwt.verify(accessToken, secret) as JwtPayload;

        return user;
      } catch {
        return null;
      }
    }
  }

  return null;
};

export default verifyUser;
