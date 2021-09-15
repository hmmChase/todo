import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const users = [];

export const createUser = async (email, password) => {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex');

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  const user = { id: uuidv4(), createdAt: Date.now(), email, hash, salt };

  // This is an in memory store for users, there is no data persistence without a proper DB
  users.push(user);

  return user;
};

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export const validatePassword = async (user, inputPassword) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex');

  const passwordsMatch = user.hash === inputHash;

  return passwordsMatch;
};

export const userClientCleaner = user => ({
  id: user.id,
  email: user.email,
  role: user.role
});
