import bcrypt from 'bcryptjs';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import * as auth from '../utils/auth';
import * as mail from '../utils/mail';

export default {
  Query: {
    user: async (parent, args, ctx, info) => {
      return await ctx.prisma.query.user({ where: { id: args.id } });
    },

    users: async (parent, args, ctx, info) => {
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
        throw new UserInputError(`No such user found for email ${email}`);
      }

      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new AuthenticationError('Invalid Password');
      }

      await auth.sendCookie(ctx.res, { userId: user.id });

      return user;
    },

    signOut: (parent, args, ctx, info) => {
      ctx.res.clearCookie('token');
      return true;
    },

    resetRequest: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();

      const user = await ctx.prisma.query.user({ where: { email } });
      if (!user) {
        throw new UserInputError(`No such user found for email ${email}`);
      }

      // Set a reset token and expiry on that user
      const randomBytesPromisified = promisify(randomBytes);
      const resetTokenBytes = await randomBytesPromisified(20);
      const resetToken = resetTokenBytes.toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

      await ctx.prisma.mutation.updateUser({
        where: { email },
        data: { resetToken, resetTokenExpiry }
      });

      // Email them that reset token
      await mail.mailResetToken(user.email, resetToken);

      return true;
    },

    resetPassword: async (parent, args, ctx, info) => {
      // Check if the passwords match
      if (args.password !== args.confirmPassword) {
        throw new UserInputError("Passwords don't match.");
      }

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

      // Hash their new password
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
