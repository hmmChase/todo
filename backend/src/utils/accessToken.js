import { ForbiddenError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
// import Iron from '@hapi/iron';

import { accessTokenExpiryTime } from '../constants/config.js';

const secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

export const createAccessToken = payload => {
  // const ironAT = await Iron.seal(payload, secret, Iron.defaults);

  const JWToptions = { expiresIn: accessTokenExpiryTime };

  const jwtAccessToken = jwt.sign(payload, secret, JWToptions);

  return jwtAccessToken;
};

//! TODO: https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

export const verifyAccessToken = accessToken => {
  try {
    // const payload = await Iron.unseal(accessToken, secret, Iron.defaults);

    // Decode payload if signature is valid and JWT not expired
    const payload = jwt.verify(accessToken, secret);

    // Return payload
    return payload;
  } catch (error) {
    console.log('accessToken verifyAccessToken error: ', error);

    // If not, throw error
    throw new ForbiddenError(error.message);
  }
};
