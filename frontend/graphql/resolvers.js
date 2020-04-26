import jwt from 'jsonwebtoken';
import { getAccessToken } from '../utils/accessToken';
import { accessTokenSecret, refreshTokenSecret } from '../constants';

export default (accessToken, refreshToken) => {
  // const theAccessToken = accessToken || getAccessToken();

  return {
    Query: {
      isLoggedIn: (parent, args, ctx, info) => {
        try {
          // jwt.verify(theAccessToken, accessTokenSecret);
          jwt.verify(refreshToken, refreshTokenSecret);

          return true;
        } catch (error) {
          console.log('isLoggedIn error: ', error);

          return false;
        }
      },

      //   renderedOn: (parent, args, ctx, info) =>
      //     typeof window === 'undefined' ? 'Server' : 'Client',
    },

    // // Mutation: {},
    // User: {
    //   color: (parent, args, ctx, info) => 'green',
    // },}
  };
};
