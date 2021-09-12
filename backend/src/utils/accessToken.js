import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
// import Iron from '@hapi/iron';

import { options, cookieOptions } from '../config';

const secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

export const createAccessToken = userId => {
  // const ironAT = await Iron.seal({ userId }, secret, Iron.defaults);

  const jwtAT = jwt.sign({ userId }, secret, options);

  return jwtAT;
};

export const refreshAccessToken = (res, userId) => {
  // Create new Access token
  const accessToken = createAccessToken(userId);

  // Set Access token cookie
  res.cookie('at', accessToken, cookieOptions);
};

export const verifyAccessToken = accessToken => {
  if (!accessToken) return new AuthenticationError('user.invalidCredentials');

  try {
    // const payload = await Iron.unseal(accessToken, secret, Iron.defaults);

    // Decode payload if signature is valid and JWT not expired
    const payload = jwt.verify(accessToken, secret);

    // Return payload
    return payload;
  } catch (error) {
    console.log('verifyAccessToken error : ', error);

    // If not, throw error
    throw new AuthenticationError('user.invalidCredentials');
  }
};
