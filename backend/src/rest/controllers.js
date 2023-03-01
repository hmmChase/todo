/* index */
import { backendUrl, frontendUrl } from '../constants/config.js';

export const index = (req, res, next) =>
  res.status(200).json({
    route: 'index',
    'backendUrl:': backendUrl,
    'frontendUrl:': frontendUrl,
    'process.env.NODE_ENV:': process.env.NODE_ENV,
    'process.env.VERCEL_URL:': process.env.VERCEL_URL,
    'process.env.VERCEL_ENV:': process.env.VERCEL_ENV
  });
