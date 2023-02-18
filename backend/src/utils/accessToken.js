import { accessTokenExpiry, development } from '../constants/config.js';
import consoleLog from '../utils/consoleLog.js';
import GQLError from './GQLError.js';
import jwt from 'jsonwebtoken';
// import Iron from '@hapi/iron';

//! TODO: https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

const secret = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64');

export const newAccessToken = payload => {
  // const ironAT = await Iron.seal(payload, secret, Iron.defaults);

  const JWToptions = { expiresIn: accessTokenExpiry };

  const jwtAccessToken = jwt.sign(payload, secret, JWToptions);

  return jwtAccessToken;
};

export const authAccessToken = accessToken => {
  try {
    // const payload = await Iron.unseal(accessToken, secret, Iron.defaults);

    const payload = jwt.verify(accessToken, secret);

    return payload;
  } catch (error) {
    development && consoleLog(error);

    GQLError(401, error.message);
  }
};
