import { UserInputError } from 'apollo-server-express';
import bcryptjs from 'bcryptjs';
// import argon2 from 'argon2';
// import crypto from 'crypto';

export const createUserObj = user => ({
  user: { id: user.id, email: user.email, role: user.role }
});

export const passwordCompare = async (inputPassword, userPassword) => {
  /**
  const passwordHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
    .toString('hex');
  const passwordsMatch = inputPassword === userPassword;

  const valid = await argon2.verify(inputPassword, userPassword);
  */

  const isCorrectPass = await bcryptjs.compare(inputPassword, userPassword);

  if (!isCorrectPass) throw new UserInputError({ msg: 'user.password.wrong' });
};
