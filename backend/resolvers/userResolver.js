import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import mailPasswordResetToken from '../utils/mail';
import { createAccessToken, verifyAccessToken } from '../utils/accessToken';
import { createRefreshToken, sendRefreshToken } from '../utils/refreshToken';
import {
  createPasswordResetToken,
  validateResetTokenExpiry,
} from '../utils/resetToken';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  checkPassword,
  comparePasswords,
} from '../utils/validation';
import { saltRounds } from '../config';

//? import getConfig from 'next/config';
//? const JWT_SECRET = getConfig().serverRuntimeConfig.JWT_SECRET;

export default {
  Query: {
    user: (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token
      verifyAccessToken(ctx.accessToken);

      // Find and return user matching ID
      return ctx.prisma.query.user({ where: { id: args.id } }, info);
    },

    users: (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token
      verifyAccessToken(ctx.accessToken);

      // Return all users
      return ctx.prisma.query.users({ orderBy: args.orderBy }, info);
    },

    usersConnection: (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token
      verifyAccessToken(ctx.accessToken);

      // Return all users
      return ctx.prisma.query.usersConnection({}, info);
    },

    currentUser: async (parent, args, ctx, info) => {
      // If no access token, return nothing
      if (!ctx.accessToken) return null;

      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      // Find user matching userId
      const user = await ctx.prisma.query.user(
        { where: { id: payload.userId } },
        info
      );

      // If no user found, return nothing
      if (!user) return null;

      // Return user
      return user;
    },
  },

  Mutation: {
    signUp: async (parent, args, ctx, info) => {
      // Check if username is well-formed
      validateUsername(args.username);

      // Normalize email
      const email = args.email.toLowerCase();

      // Check if email address is well-formed
      validateEmail(email);

      // Find user matching username
      const user = await ctx.prisma.query.user({
        where: { username: args.username },
      });

      // If user found, return error
      if (user)
        throw new AuthenticationError(`Username ${args.username} unavailable`);

      // Check if password is well-formed
      validatePassword(args.password);

      // Check if user confirmed password correctly
      comparePasswords(args.password, args.confirmPassword);

      // Encrypt password
      const password = await bcrypt.hash(args.password, saltRounds);

      // Create user
      const newUser = await ctx.prisma.mutation.createUser({
        data: { username: args.username, email, password },
      });

      // Create refresh token
      const refreshToken = createRefreshToken(
        newUser.id,
        newUser.refreshTokenVersion
      );

      // Send a new refresh token cookie
      sendRefreshToken(ctx.res, refreshToken);

      // Create access token
      const accessToken = createAccessToken(newUser.id);

      // Return access token and user data
      return {
        accessToken,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          ideas: newUser.ideas,
        },
      };
    },

    signIn: async (parent, args, ctx, info) => {
      // Check if username is well-formed
      validateUsername(args.username);

      // Find user matching username
      const user = await ctx.prisma.query.user({
        where: { username: args.username },
      });

      // If user not found, return error
      if (!user)
        throw new AuthenticationError(`No account found for ${args.username}`);

      // Check if typed password matches users password
      await checkPassword(args.password, user.password);

      // Create refresh token
      const refreshToken = createRefreshToken(
        user.id,
        user.refreshTokenVersion
      );

      // Send a new refresh token cookie
      sendRefreshToken(ctx.res, refreshToken);

      // Create access token
      const accessToken = createAccessToken(user.id);

      // Return access token and user data
      return {
        accessToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          ideas: user.ideas,
        },
      };
    },

    signOut: (parent, args, ctx, info) => {
      // Clear cookie
      ctx.res.clearCookie('rt');

      // ctx.res.setHeader(
      //   'Set-Cookie',
      //   cookie.serialize('rt', '', {
      //     httpOnly: true,
      //     path: '/',
      //     secure: process.env.NODE_ENV === 'production',
      //     maxAge: -1,
      //     sameSite: 'strict'
      //   })
      // );

      // Return boolean
      return true;
    },

    requestReset: async (parent, args, ctx, info) => {
      // Normalize email
      const email = args.email.toLowerCase();

      // Find user matching email
      const user = await ctx.prisma.query.user({ where: { email } });

      // If user not found, return error
      if (!user) throw new AuthenticationError(`No account found for ${email}`);

      // Generate password reset token
      const { resetToken, resetTokenExpiry } = await createPasswordResetToken();

      // Update user with reset token
      ctx.prisma.mutation.updateUser({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry },
      });

      // Send mail with reset link
      mailPasswordResetToken(email, resetToken, resetTokenExpiry);

      // Return boolean
      return true;
    },

    resetPassword: async (parent, args, ctx, info) => {
      // Check if password meet requirements
      validatePassword(args.password);

      // Check if password matches confirm password
      comparePasswords(args.password, args.confirmPassword);

      // Get user from resetToken
      const [user] = await ctx.prisma.query.users({
        where: { resetToken: args.resetToken },
      });

      // Return error if user not found
      if (!user)
        throw new AuthenticationError(
          'Error: Please submit a new password reset request.'
        );

      // Check if token is expired
      validateResetTokenExpiry(user.resetTokenExpiry);

      // Encrypt new password
      const password = await bcrypt.hash(args.password, saltRounds);

      // Update user with new password and clear resetToken
      ctx.prisma.mutation.updateUser({
        where: { id: user.id },
        data: { password, resetToken: null, resetTokenExpiry: null },
      });

      // Return boolean
      return true;
    },

    revokeRefreshToken: async (parent, args, ctx, info) => {
      // Get user
      const user = await ctx.prisma.query.user({ where: { id: args.id } });

      // Increment refresh token version
      const incrementedVersion = user.refreshTokenVersion + 1;

      // Update refresh token version
      ctx.prisma.mutation.updateUser({
        where: { id: user.id },
        data: { refreshTokenVersion: incrementedVersion },
      });

      // Return boolean
      return true;
    },
  },
};
