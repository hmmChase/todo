import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
// import Iron from '@hapi/iron';

import { accessTokenExpiry } from '../constants/config.js';

const secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

export const createAccessToken = payload => {
  // const ironAT = await Iron.seal(payload, secret, Iron.defaults);

  const JWToptions = { expiresIn: accessTokenExpiry };

  const jwtAccessToken = jwt.sign(payload, secret, JWToptions);

  return jwtAccessToken;
};

//! TODO: https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

export const verifyAccessToken = accessToken => {
  try {
    // const payload = await Iron.unseal(accessToken, secret, Iron.defaults);

    const payload = jwt.verify(accessToken, secret);

    return payload;
  } catch (error) {
    throw new AuthenticationError(error);
  }
};
