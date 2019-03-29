import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

export default {
  Query: {
    user: (parent, args, ctx, info) => {
      return ctx.prisma.user({ id: args.id });
    },

    users: (parent, args, ctx, info) => {
      return ctx.prisma.users();
    },

    me: (parent, args, ctx, info) => {
      if (!ctx.me) return null;

      return ctx.prisma.user({ id: ctx.me.userId });
    }
  },

  Mutation: {
    signUp: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();
      const password = await bcrypt.hash(args.password, 10);

      const user = await ctx.prisma.createUser({ email, password });

      const JWT = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      ctx.res.cookie('token', JWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      });

      return user;
    },

    signIn: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();

      const user = await ctx.prisma.user({ email });
      if (!user) {
        throw new UserInputError(`No such user found for email ${email}`);
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Invalid Password');
      }

      const JWT = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      ctx.res.cookie('token', JWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      });

      return user;
    }
  }
};
