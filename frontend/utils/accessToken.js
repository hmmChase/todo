import fetch from 'isomorphic-unfetch';
// import cookie from 'cookie';
// import jwt from 'jsonwebtoken';

let accessToken = '';

export const setAccessToken = token => (accessToken = token);

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => (accessToken = '');

export const fetchAccessToken = async refreshToken => {
  const url =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_REFRESH_URL
      : process.env.PROD_REFRESH_URL;

  const options = {
    method: 'GET',
    credentials: 'include',
    headers: { cookie: `rt=${refreshToken}` }
  };

  try {
    const response = await fetch(url, options);

    const data = await response.json();

    return data.accessToken;
  } catch (error) {
    if (process.env.NODE_ENV === 'development')
      console.error('fetchAccessToken error: ', error);
  }
};

// export const verifyAccessToken = accessToken => {
//   try {
//     jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
//   } catch (error) {
//     if (process.env.NODE_ENV === 'development')
//       console.error('fetchAccessToken error: ', error);
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
