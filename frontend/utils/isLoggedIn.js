import * as query from '../components/wrappers/WithUser/WithUser.query';

export const isLoggedIn = async client => {
  try {
    const response = await client.query({
      query: query.ME_QUERY
    });
    console.log('TCL: response', response);

    return response.data.me;
  } catch (err) {
    console.log('Error: ', err);
    return null;
  }
};
