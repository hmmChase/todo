import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import apolloServer from './apolloServer';
import prisma from './prismaClient';
import logger from './utils/logger';
import {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} from './utils/auth';
import { port } from './constants';

const app = express();
const server = apolloServer();

const corsOptions = {
  credentials: true,
  origin:
    process.env.NODE_ENV === 'production'
      ? 'https://lhkfjdsaoir.now.sh'
      : 'http://localhost:8008',
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') app.use(logger);

app.get('/', (_req, res) => res.send('/'));

app.get('/api', (_req, res) => res.send('api'));

app.get('/api/refresh', async (req, res) => {
  // Read refresh token
  const refreshToken = req.cookies.rt;

  // If no refresh token, return empty access token
  if (!refreshToken) return res.status(422).json({ accessToken: '' });

  // Declare payload
  let payload = null;

  // Verify refresh token and decode payload
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    // If error, return empty access token
    return res.status(422).json({ accessToken: '' });
  }

  // Get user matching userId
  const user = await prisma.query.user({ where: { id: payload.userId } });

  // If no user found, return empty access token
  if (!user) return res.status(422).json({ accessToken: '' });

  // If refresh token versions don't match, return empty access token
  if (user.refreshTokenVersion !== payload.refreshTokenVersion)
    return res.status(422).json({ accessToken: '' });

  // Create a fresh refresh token
  const newRefreshToken = createRefreshToken(user.id, user.refreshTokenVersion);

  // Send a new refresh token cookie
  sendRefreshToken(res, newRefreshToken);

  // Create access token
  const newAccessToken = createAccessToken(user.id);

  // Send access token
  return res.status(200).json({ accessToken: newAccessToken });
});

server.applyMiddleware({ app, path: '/api/graphql', cors: corsOptions });

app.listen({ port: port || 4000 }, (err) => {
  if (err) throw err;

  console.log(`Server ready at http://localhost:${port}/api/`);
});
