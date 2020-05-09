import { AuthenticationError } from 'apollo-server-express';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

export const createPasswordResetToken = async () => {
  const randomBytesPromisified = promisify(randomBytes);
  const resetTokenBytes = await randomBytesPromisified(20);

  const resetToken = resetTokenBytes.toString('hex');
  const resetTokenExpiry = Date.now() + resetTokenExpiryTime;

  return { resetToken, resetTokenExpiry };
};

export const validateResetTokenExpiry = (resetTokenExpiry) => {
  const isTokenExpired = Date.now() > resetTokenExpiry;

  if (isTokenExpired)
    throw new AuthenticationError(
      'Your reset request has expired. Please submit a new one.'
    );
};
