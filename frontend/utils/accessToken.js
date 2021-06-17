import fetch from 'isomorphic-unfetch';
import { devConErr } from './devCon';
import { refreshUrlDev, refreshUrlProd } from '../config';

let accessToken = '';

export const setAccessToken = token => (accessToken = token);

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => (accessToken = '');

export const fetchAccessToken = async refreshToken => {
  const refreshUrl =
    process.env.NODE_ENV === 'production' ? refreshUrlProd : refreshUrlDev;

  try {
    const response = await fetch(refreshUrl, {
      method: 'GET',
      credentials: 'include',
      headers: { cookie: `rt=${refreshToken}` }
    });

    const data = await response.json();

    return data.accessToken;
  } catch (error) {
    devConErr(['fetchAccessToken error: ', error]);

    return '';
  }
};
