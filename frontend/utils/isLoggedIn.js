/* eslint-disable no-console */
import * as query from '../components/wrappers/WithUser/WithUser.query';

export const isLoggedIn = async client => {
  try {
    const res = await client.query({
      query: query.ME_QUERY
    });

    return res.data.me;
  } catch (err) {
    return null;
  }
};
