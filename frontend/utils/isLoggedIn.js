import * as query from '../components/wrappers/WithUser/WithUser.query';

export const isLoggedIn = async client => {
  try {
    const {
      data: { me }
    } = await client.query({ query: query.ME_QUERY });

    return me;
  } catch {
    return null;
  }
};
