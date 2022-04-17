// Not used

import { IS_LOGGED_IN } from './queries/user';
import verifyUser from '../utils/verifyUser';
import { InMemoryCache } from '@apollo/client';

const cache = () => {
  (cache: InMemoryCache, accessCookie: string) => {
    // const theAccessToken = accessToken || getAccessToken();

    let isLoggedIn = false;

    if (accessCookie) isLoggedIn = verifyUser(accessCookie) !== null;

    cache.writeQuery({
      id: 'isLoggedIn',
      query: IS_LOGGED_IN,
      data: { isLoggedIn }
    });
  };
};

export default cache;
