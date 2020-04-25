import jwt from 'jsonwebtoken';
import { getAccessToken } from '../utils/accessToken';
import { accessTokenSecret } from '../constants';
// import { IS_LOGGED_IN } from './queries';

const verifyAccessToken = (accessToken) => {
  try {
    jwt.verify(accessToken, accessTokenSecret);

    return true;
  } catch {
    return false;
  }
};

export default (cache, accessToken) => {
  const theAccessToken = accessToken || getAccessToken();

  let isLoggedIn = false;

  if (theAccessToken) isLoggedIn = verifyAccessToken(theAccessToken);

  cache.writeData({ id: 'isLoggedIn', data: { isLoggedIn } });

  // cache.writeQuery({
  //   id: 'isLoggedIn',
  //   query: IS_LOGGED_IN,
  //   data: { isLoggedIn },
  // });
};

// export default (cache, accessToken) => {
//   const theAccessToken = accessToken || getAccessToken();

//   if (theAccessToken) {
//     try {
//       jwt.verify(theAccessToken, accessTokenSecret);

//       cache.writeData({ id: 'isLoggedIn', data: { isLoggedIn: true } });

//       // cache.writeQuery({
//       //   id: 'isLoggedIn',
//       //   query: IS_LOGGED_IN,
//       //   data: { isLoggedIn: !!theAccessToken },
//       // });
//     } catch {
//       cache.writeData({ id: 'isLoggedIn', data: { isLoggedIn: false } });

//       // cache.writeQuery({
//       //   id: 'isLoggedIn',
//       //   query: IS_LOGGED_IN,
//       //   data: { isLoggedIn: !!theAccessToken },
//       // });
//     }
//   } else {
//     cache.writeData({ id: 'isLoggedIn', data: { isLoggedIn: false } });

//     // cache.writeQuery({
//     //   id: 'isLoggedIn',
//     //   query: IS_LOGGED_IN,
//     //   data: { isLoggedIn: !!theAccessToken },
//     // });
//   }
// };
