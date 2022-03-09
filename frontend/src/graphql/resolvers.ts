// import jwt from 'jsonwebtoken';
// import { getAccessToken } from '../utils/accessToken';

const resolvers = () => {
  // const theAccessToken = accessToken || getAccessToken();

  return {
    // Query: {
    // isLoggedIn: (parent, args, ctx, info) => {
    //   // try {
    //   //   // jwt.verify(theAccessToken, process.env.ACCESS_TOKEN_SECRET);
    //   //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    //   //   return true;
    //   // } catch (error) {
    //   //   console.log('isLoggedIn error: ', error);
    //   //   return false;
    //   // }
    //   return false;
    // }
    //   renderedOn: (parent, args, ctx, info) =>
    //     typeof window === 'undefined' ? 'Server' : 'Client',
  };

  // // Mutation: {},
  // User: {
  //   color: (parent, args, ctx, info) => 'green',
  // },}
  // };
};

export default resolvers;
