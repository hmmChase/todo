import { InMemoryCache } from '@apollo/client';

import { IS_LOGGED_IN } from '@/graphql/queries/user';
import verifyUser from '@/utils/verifyUser';

// Not used

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
