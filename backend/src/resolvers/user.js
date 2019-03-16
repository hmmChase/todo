import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

export default {
  Query: {
    user: (parent, args, ctx, info) => {
      return ctx.prisma.user({ where: { id: args.id } });
    },

    users: (parent, args, ctx, info) => {
      return ctx.prisma.users({});
    }
  },

  Mutation: {
    signUp: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();
      const password = await bcrypt.hash(args.password, 10);

      const JWT = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      ctx.res.cookie('token', JWT, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      });

      console.log(' : -----------');
      console.log(' : ctx.res.cookie: ', ctx.res.cookie);
      console.log(' : -----------');

      const user = ctx.prisma.createUser({ email, password });

      return user;
    },

    signIn: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();

      const user = await ctx.prisma.user({ where: { email } });
      if (!user) {
        throw new UserInputError(`No such user found for email ${email}`);
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Invalid Password');
      }

      const JWT = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      ctx.res.cookie('token', JWT, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365
      });

      return user;
    }
  }
};
