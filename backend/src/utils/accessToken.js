import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
// import Iron from '@hapi/iron';

import { JWToptions } from '../config';

const secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

export const createAccessToken = payload => {
  // const ironAT = await Iron.seal(payload, secret, Iron.defaults);

  const jwtAccessToken = jwt.sign(payload, secret, JWToptions);

  return jwtAccessToken;
};

export const verifyAccessToken = accessToken => {
  try {
    // const payload = await Iron.unseal(accessToken, secret, Iron.defaults);

    // Decode payload if signature is valid and JWT not expired
    const payload = jwt.verify(accessToken, secret);

    // Return payload
    return payload;
  } catch (error) {
    console.log('verifyAccessToken error: ', error);

    // If not, throw error
    throw new AuthenticationError('user.invalidToken');
  }
};
