import fetch from 'isomorphic-unfetch';
import { refreshUrl, _accessTokenSecret } from '../constants';

let accessToken = '';

export const setAccessToken = (token) => (accessToken = token);

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => (accessToken = '');

export const fetchAccessToken = async (refreshToken) => {
  try {
    const response = await fetch(refreshUrl, {
      method: 'GET',
      credentials: 'include',
      headers: { cookie: `rt=${refreshToken}` },
    });

    const data = await response.json();

    return data.accessToken;
  } catch (error) {
    console.error('fetchAccessToken error: ', error);

    return '';
  }
};

// export const verifyAccessToken = (accessToken) => {
//   try {
//     jwt.verify(accessToken, accessTokenSecret);
//   } catch (error) {
//     console.error('verifyAccessToken error: ', error);
//   }
// };

// const checkAccessToken = async cookies => {
//   const accessToken = getAccessToken();

//   if (!accessToken) return true;

//   const parsedCookies = cookie.parse(cookies);

//   if (!parsedCookies.rt) return '';

//   // const response = await fetchAccessToken(parsedCookies.rt);

//   // const data = await response.json();

//   // setAccessToken(data.accessToken);
//   // setAccessTokenExpiry(data.exp);

//   // return data.accessToken;
// };
