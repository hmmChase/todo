import bcrypt from 'bcryptjs';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import * as auth from '../utils/auth';

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
    }
  }
};
