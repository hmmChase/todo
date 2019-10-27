import bcrypt from 'bcryptjs';
import {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from 'apollo-server-express';

import mailPasswordResetToken from '../utils/mail';
import {
  createRefreshToken,
  sendRefreshToken,
  createAccessToken
} from '../utils/auth';
import * as auth from '../utils/auth';
import * as config from '../config';

export default {
  Query: {
    user: (parent, args, ctx, info) => {
      // Find and return user matching ID
      return ctx.prisma.query.user({ where: { id: args.id } }, info);
    },

    users: (parent, args, ctx, info) => {
      console.log('----------users');

      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token
      auth.verifyAccessToken(ctx.accessToken);

      // Return all users
      return ctx.prisma.query.users({ orderBy: args.orderBy }, info);
    },

    usersConnection: (parent, args, ctx, info) => {
      return ctx.prisma.query.usersConnection({}, info);
    },

    currentUser: async (parent, args, ctx, info) => {
      console.log('----------currentUser');

      // If no access token, return nothing
      if (!ctx.accessToken) return null;

      // Verify access token and decode payload
      const userId = auth.verifyAccessToken(ctx.accessToken);

      // Find user matching payload ID
      const user = await ctx.prisma.query.user(
        { where: { id: userId.userId } },
        info
      );

      // If no user found, return null
      if (!user) return null;

      // Return user
      return user;
    }
  },

  Mutation: {
    signUp: async (parent, args, ctx, info) => {
      // Normalize email
      const email = args.email.toLowerCase();

      // Check if email address is well-formed
      auth.validateEmail(email);

      // Check if password is well-formed
      auth.validatePassword(args.password);

      // Check if user typed confirm password correctly
      auth.comparePasswords(args.password, args.confirmPassword);

      // Find user matching email
      const user = await ctx.prisma.query.user({ where: { email } });

      // If user found, return error
      if (user)
        throw new AuthenticationError(`An account already exists for ${email}`);

      // Encrypt password
      const password = await bcrypt.hash(args.password, config.saltRounds);

      // Create user
      const newUser = await ctx.prisma.mutation.createUser({
        data: { email, password }
      });

      // Create payload for cookie
      const payload = { user: { id: user.id } };

      // Send cookie
      await auth.sendCookie(ctx.res, payload);

      // Return User
      return newUser;
    },

    signIn: async (parent, args, ctx, info) => {
      // Normalize email
      const email = args.email.toLowerCase();

      // Find user matching email
      const user = await ctx.prisma.query.user({ where: { email } });

      // If user not found, return error
      if (!user) throw new AuthenticationError(`No account found for ${email}`);

      // Check if input password matches users password
      await auth.checkPassword(args.password, user.password);

      // // Create payload for cookie
      // const payload = {
      //   user: { id: user.id, tokenVersion: user.tokenVersion }
      // };

      // // Send cookie
      // await auth.sendCookie(ctx.res, payload);

      // // Return User
      // return user;

      // Create refresh token
      const refreshToken = createRefreshToken(user.id, user.tokenVersion);

      // Send a new refresh token cookie
      sendRefreshToken(ctx.res, refreshToken);

      // Create access token
      const accessToken = createAccessToken(user.id);

      // Return access token and user info
      return {
        accessToken,
        user: { id: user.id, email: user.email, ideas: user.ideas }
      };
    },

    signOut: (parent, args, ctx, info) => {
      // Clear cookie
      ctx.res.clearCookie('rt');

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
      const {
        resetToken,
        resetTokenExpiry
      } = await auth.createPasswordResetToken();

      // Update user with reset token
      ctx.prisma.mutation.updateUser({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry }
      });

      // Send mail with reset link
      mailPasswordResetToken(email, resetToken, resetTokenExpiry);

      // Return boolean
      return true;
    },

    resetPassword: async (parent, args, ctx, info) => {
      // Check if password meet requirements
      auth.validatePassword(args.password);

      // Check if password matches confirm password
      auth.comparePasswords(args.password, args.confirmPassword);

      // Get user from resetToken
      const [user] = await ctx.prisma.query.users({
        where: { resetToken: args.resetToken }
      });

      // Return error if user not found
      if (!user)
        throw new AuthenticationError(
          'Error: Please submit a new password reset request.'
        );

      // Check if token is expired
      auth.validateResetTokenExpiry(user.resetTokenExpiry);

      // Encrypt new password
      const password = await bcrypt.hash(args.password, config.saltRounds);

      // Update user with new password and clear resetToken
      ctx.prisma.mutation.updateUser({
        where: { id: user.id },
        data: { password, resetToken: null, resetTokenExpiry: null }
      });

      /* Should it auto-login the user?
      // Create payload for cookie
      const payload = { user: { id: updatedUser.id } };

      // Send a fresh cookie
      auth.sendCookie(ctx.res, payload);
      */

      // Return boolean
      return true;
    },

    revokeRefreshTokensForUser: async (parent, args, ctx, info) => {
      // await getConnection()
      //   .increment({ id: userId }, "tokenVersion", 1);

      return true;
    }
  }
};

// // Mutation
// refreshAccessToken: async (parent, args, ctx, info) => {
//   // Get new access token
//   const { newAccessToken, newRefreshToken } = await refreshAccessToken(
//     args.refreshToken,
//     ctx.prisma,
//     process.env.JWT_SECRET
//   );

//   // Return new tokens
//   return { token: newAccessToken, refreshToken: newRefreshToken };
// },

// // Define token expiry times
// const accessTokenExpiry = '10m';
// const refreshTokenExpiry = '60m';

// // Create access and refresh tokens
// const createTokens = async (user, secret) => {
//   // Create access token
//   const accessToken = jwt.sign({ userId: user.id }, secret, {
//     expiresIn: accessTokenExpiry
//   });

//   // Create refresh token
//   const refreshToken = jwt.sign({ userId: user.id }, secret, {
//     expiresIn: refreshTokenExpiry
//   });

//   return Promise.all([accessToken, refreshToken]);
// };

// // Refresh access token
// export const refreshAccessToken = async (refreshToken, prisma, secret) => {
//   let userId;

//   // Attempt to verify refresh token
//   try {
//     // Get return values from verification
//     userId = await jwt.verify(refreshToken, secret);
//   } catch (err) {
//     // Return nothing if verification fails
//     throw new ForbiddenError('Please sign in again to continue');
//   }

//   // Find user 'me' by id
//   const user = await prisma.query.user({ where: { id: userId } });

//   // Create new access token
//   const newAccessToken = await jwt.sign({ userId: user.id }, secret, {
//     expiresIn: accessTokenExpiry
//   });

//   // Create new refresh token to extend idle timeout
//   const newRefreshToken = await jwt.sign({ userId: user.id }, secret, {
//     expiresIn: refreshTokenExpiry
//   });

//   // Return tokens and user
//   return { newAccessToken, newRefreshToken };
// };

// --------------------------------
