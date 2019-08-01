import { IS_LOGGED_IN } from '../graphql/queries';

export default async client => {
  try {
    const {
      data: { isLoggedIn }
    } = await client.query({ query: IS_LOGGED_IN });

    return isLoggedIn;
  } catch {
    return null;
  }
};
