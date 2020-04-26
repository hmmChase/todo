import fetch from 'isomorphic-unfetch';
import { refreshUrl } from '../constants';

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
