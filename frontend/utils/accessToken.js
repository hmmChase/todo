import fetch from 'isomorphic-unfetch';
import cookie from 'cookie';

let accessToken = '';

export const setAccessToken = token => (accessToken = token);

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => (accessToken = '');

export const fetchAccessToken = async cookies => {
  const parsedCookies = cookie.parse(cookies);

  if (!parsedCookies.rt) return '';

  try {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.DEV_REFRESH_URL
        : process.env.PROD_REFRESH_URL;

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: { cookie: `rt=${parsedCookies.rt}` }
    });

    const data = await response.json();

    setAccessToken(data.accessToken);

    return data.accessToken;
  } catch (error) {
    if (process.env.NODE_ENV === 'development')
      console.error('fetchAccessToken error: ', error);

    return '';
  }
};
