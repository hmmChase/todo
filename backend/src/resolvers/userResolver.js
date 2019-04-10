import bcrypt from 'bcryptjs';
import {
  AuthenticationError,
  UserInputError,
  ForbiddenError
} from 'apollo-server-express';

import * as auth from '../utils/auth';
import * as mail from '../utils/mail';

export default {
  Query: {
    user: async (parent, args, ctx, info) => {
      return await ctx.prisma.query.user({ where: { id: args.id } });
    },

    users: async (parent, args, ctx, info) => {
      if (!ctx.me) {
        throw new ForbiddenError('You must be signed in.');
      }

      const users = await ctx.prisma.query.users({}, info);

      return users;
    },

    me: async (parent, args, ctx, info) => {
      if (!ctx.me) return null;

      return await ctx.prisma.query.user({ where: { id: ctx.me.userId } });
    }
  },

  Mutation: {
    signUp: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();

      const accountExists = await ctx.prisma.query.user({
        where: { email }
      });

      if (accountExists) {
        throw new UserInputError(`An account already exists for ${email}`);
      }

      auth.validateEmail(args.email);
      auth.validatePassword(args.password);
      auth.comparePasswords(args.password, args.confirmPassword);

      const password = await bcrypt.hash(args.password, 10);

      const user = await ctx.prisma.mutation.createUser({
        data: { email, password }
      });

      await auth.sendCookie(ctx.res, { userId: user.id });

      return user;
    },

    signIn: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();

      const user = await ctx.prisma.query.user({ where: { email } });

      if (!user) {
        throw new UserInputError(`No user found for email ${email}`);
      }

      await auth.checkPassword(args.password, user.password);

      await auth.sendCookie(ctx.res, { userId: user.id });

      return user;
    },

    signOut: (parent, args, ctx, info) => {
      ctx.res.clearCookie('token');

      return true;
    },

    requestReset: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();

      const user = await ctx.prisma.query.user({ where: { email } });

      if (!user) {
        throw new UserInputError(`No such user found for email ${email}`);
      }

      // Set a reset token and expiry on the user
      const { resetToken, resetTokenExpiry } = await genResetToken();

      await ctx.prisma.mutation.updateUser({
        where: { email },
        data: { resetToken, resetTokenExpiry }
      });

      // Email them the reset token
      await mail.mailResetToken(email, resetToken);

      return true;
    },

    resetPassword: async (parent, args, ctx, info) => {
      auth.comparePasswords(args.password, args.confirmPassword);

      // Check if its a legit reset token and not expired
      const [user] = await ctx.prisma.query.users({
        where: {
          resetToken: args.resetToken,
          resetTokenExpiry_gte: Date.now() - 3600000
        }
      });

      if (!user) {
        throw new AuthenticationError(
          'This token is either invalid or expired.'
        );
      }

      const password = await bcrypt.hash(args.password, 10);

      // Save the new password to the user and remove old resetToken fields
      const updatedUser = await ctx.prisma.mutation.updateUser({
        where: { email: user.email },
        data: {
          password,
          resetToken: null,
          resetTokenExpiry: null
        }
      });

      // Generate updated JWT and send cookie
      await auth.sendCookie(ctx.res, { userId: updatedUser.id });

      // Return the new user
      return updatedUser;
    }
  }
};
