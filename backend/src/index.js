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
  createRefreshToken
} from './utils/auth';

const app = express();
const server = apolloServer();

const corsOptions = {
  credentials: true,
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_FRONTEND_URL
      : process.env.DEV_FRONTEND_URL
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') app.use(logger);

app.post('/api/refresh', async (req, res) => {
  console.log('/api/refresh');

  // Read refresh token
  const refreshToken = req.cookies.rt;

  // If no refresh token, return empty access token
  if (!refreshToken) return res.send({ ok: false, accessToken: '' });

  // Declare payload
  let payload = null;

  // Verify refresh token
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    // If error, return empty access token
    return res.send({ ok: false, accessToken: '' });
  }

  // Get user
  const user = await prisma.query.user({ where: { id: payload.userId } });

  // If no user found, return empty access token
  if (!user) return res.send({ ok: false, accessToken: '' });

  // If token version does not match, return empty access token
  if (user.refreshTokenVersion !== payload.refreshTokenVersion)
    return res.send({ ok: false, accessToken: '' });

  // Create a new refresh token
  const newRefreshToken = createRefreshToken(user.id, user.refreshTokenVersion);

  // Send a new refresh token cookie
  sendRefreshToken(res, newRefreshToken);

  // Create access token
  const accessToken = createAccessToken(user.id);

  // Send access token
  return res.send({ ok: true, accessToken });
});

server.applyMiddleware({ app, path: '/api/graphql', cors: corsOptions });

app.listen({ port: process.env.PORT || 4000 }, err => {
  if (err) throw err;
  console.log(
    `Apollo Server ready at http://localhost:${process.env.PORT}/api/`
  );
});
