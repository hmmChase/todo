import { User } from '@/models/index';
import jwt from 'jsonwebtoken';

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
    const payload = jwt.verify(accessToken, secret);

    return payload;
  } catch {
    return null;
  }
};

export default verifyUser;
