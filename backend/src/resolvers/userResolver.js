import bcrypt from 'bcryptjs';
import {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from 'apollo-server-express';

import mailResetToken from '../utils/mail';
import * as auth from '../utils/auth';
import * as config from '../config';

export default {
  Query: {
    user: (parent, args, ctx, info) => {
      // Find and return user matching ID
      return ctx.prisma.query.user({ where: { id: args.id } }, info);
    },

    users: (parent, args, ctx, info) => {
      // Return all users
      return ctx.prisma.query.users({}, info);
    },

    currentUser: (parent, args, ctx, info) => {
      // if no token cookie present, return null
      if (!ctx.req && !ctx.req.cookies && !ctx.req.cookies.token) return null;

      // Verify cookie and decode payload
      const currentUser = auth.verifyJWT(ctx.req.cookies.token);

      // Find and return user matching payload ID
      // If not found, return null
      return currentUser
        ? ctx.prisma.query.user({ where: { id: currentUser.user.id } }, info)
        : null;
    }
  },

  Mutation: {
    signUp: async (parent, args, ctx, info) => {
      // Normalize email
      const email = args.email.toLowerCase();

      // Find user matching email
      const userExists = await ctx.prisma.query.user({ where: { email } });

      // If user found, return error
      if (userExists)
        throw new AuthenticationError(`An account already exists for ${email}`);

      // Check if email address is well-formed
      auth.validateEmail(args.email);

      // Check if password is well-formed
      auth.validatePassword(args.password);

      // Check if user typed confirm password correctly
      auth.comparePasswords(args.password, args.confirmPassword);

      // Encrypt password
      const password = await bcrypt.hash(args.password, config.saltRounds);

      // Create user
      const user = await ctx.prisma.mutation.createUser({
        data: { email, password }
      });

      // Create payload for cookie
      const payload = { user: { id: user.id } };

      // Send cookie
      await auth.sendCookie(ctx.res, payload);

      // Return User
      return user;
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

      // Create payload for cookie
      const payload = { user: { id: user.id } };

      // Send cookie
      await auth.sendCookie(ctx.res, payload);

      // Return User
      return user;
    },

    signOut: (parent, args, ctx, info) => {
      // Clear cookie
      ctx.res.clearCookie('token');

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

      // Generate reset token
      const { resetToken, resetTokenExpiry } = await auth.genResetToken();

      // Update user with reset token
      ctx.prisma.mutation.updateUser({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry }
      });

      // Send mail with reset link
      mailResetToken(email, resetToken, resetTokenExpiry);

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
      auth.validateTokenExpiry(user.resetTokenExpiry);

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
