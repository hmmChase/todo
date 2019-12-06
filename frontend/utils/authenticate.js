import jwt from 'jsonwebtoken';
import redirect from './redirect';
import { getAccessToken } from './accessToken';
// import { CURRENT_USER } from '../graphql/queries';

export default (_req, res, pathname) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    try {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      // apolloClient.cache.writeData({ data: { isLoggedIn: true } });

      if (pathname === '/welcome') redirect(res, '/');
    } catch (error) {
      // apolloClient.cache.writeData({ data: { isLoggedIn: false } });

      if (pathname !== '/welcome') redirect(res, '/welcome');
    }
  } else if (pathname !== '/welcome') {
    // apolloClient.cache.writeData({ data: { isLoggedIn: false } });

    redirect(res, '/welcome');
  }
};

// Not used
export const graphQLAuth = async apolloClient => {
  const { loading, error, data } = await apolloClient.query({
    query: CURRENT_USER
  });

  if (!loading && !error && data) {
    apolloClient.cache.writeData({ data: { isLoggedIn: true } });
  } else if (error) {
    apolloClient.cache.writeData({ data: { isLoggedIn: false } });
  }
};

// Not used
export const checkLoggedIn = apolloClient => {
  apolloClient
    .query({
      query: gql`
        query getUser {
          user {
            id
            name
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
};

// Not used
export const isLoggedIn = async client => {
  try {
    const {
      data: { isLoggedIn }
    } = await client.query({ query: IS_LOGGED_IN });

    return isLoggedIn;
  } catch {
    return null;
  }
};
