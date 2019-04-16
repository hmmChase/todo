import bcrypt from 'bcryptjs';
import {
  AuthenticationError,
  UserInputError,
  ForbiddenError
} from 'apollo-server-express';
import * as auth from '../utils/auth';
import * as mail from '../utils/mail';
import * as config from '../config';

export default {
  Query: {
    user: async (parent, args, ctx, info) => {
      return await ctx.prisma.query.user({ where: { id: args.id } });
    },

    users: async (parent, args, ctx, info) => {
      if (!ctx.me) {
        throw new ForbiddenError('You must be signed in to view this.');
      }

      return await ctx.prisma.query.users();
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

      const password = await bcrypt.hash(args.password, config.saltRounds);

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
        throw new UserInputError(`No account found for ${email}`);
      }

      await auth.checkPassword(args.password, user.password);

      await auth.sendCookie(ctx.res, { userId: user.id });

      return user;
    },

    signOut: async (parent, args, ctx, info) => {
      await ctx.res.clearCookie('token');

      return true;
    },

    requestReset: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();

      const user = await ctx.prisma.query.user({ where: { email } });

      if (!user) {
        throw new UserInputError(`No account found for ${email}`);
      }

      const { resetToken, resetTokenExpiry } = await auth.genResetToken();

      await ctx.prisma.mutation.updateUser({
        where: { email },
        data: { resetToken, resetTokenExpiry }
      });

      await mail.mailResetToken(email, resetToken, resetTokenExpiry);

      return true;
    },

    resetPassword: async (parent, args, ctx, info) => {
      auth.validatePassword(args.password);
      auth.comparePasswords(args.password, args.confirmPassword);

      const user = await ctx.prisma.query.user({
        where: { resetToken: args.resetToken }
      });

      if (!user) {
        throw new AuthenticationError(
          'Your reset token is invalid.  Please request a new one.'
        );
      }

      auth.validateTokenExpiry(user.resetTokenExpiry);

      const password = await bcrypt.hash(args.password, config.saltRounds);

      const updatedUser = await ctx.prisma.mutation.updateUser({
        where: { email: user.email },
        data: {
          password,
          resetToken: null,
          resetTokenExpiry: null
        }
      });

      await auth.sendCookie(ctx.res, { userId: updatedUser.id });

      return updatedUser;
    }
  }
};
