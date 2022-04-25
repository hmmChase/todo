// Not used

import jwt from 'jsonwebtoken';

import { User } from '../models';

interface JwtPayload {
  user: User;
}

const verifyUser = (accessCookie: string | undefined) => {
  const secret = Buffer.from(
    process.env.ACCESS_TOKEN_SECRET as string,
    'base64'
  );

  // If no access cookie, return null
  if (!accessCookie) return null;

  const accessToken = accessCookie.replace('access=', '');

  try {
    // Decode payload if signature is valid and JWT not expired
    const { user } = jwt.verify(accessToken, secret) as JwtPayload;

    return user;
  } catch {
    return null;
  }
};

export default verifyUser;
