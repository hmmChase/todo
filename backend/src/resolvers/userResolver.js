import bcrypt from 'bcryptjs';
import {
  AuthenticationError,
  UserInputError,
  ForbiddenError
} from 'apollo-server-express';
import * as auth from '../utils/auth';
import * as mail from '../utils/mail';
import * as config from '../config';

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

export default {
  Query: {
    me: (parent, args, ctx, info) => {
      return ctx.me
        ? ctx.prisma.query.user({ where: { id: ctx.me.user.id } })
        : null;
    },

    user: (parent, args, ctx, info) => {
      return ctx.prisma.query.user({ where: { id: args.id } }, info);
    },

    users: (parent, args, ctx, info) => {
      return ctx.prisma.query.users();
    }
  },

  Mutation: {
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
        data: { email, password, roles: { set: ['USER'] } }
      });

      const payload = { user: { id: user.id } };

      await auth.sendCookie(ctx.res, payload);

      return user;
    },

    signIn: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();

      const user = await ctx.prisma.query.user({ where: { email } });

      if (!user) {
        throw new UserInputError(`No account found for ${email}`);
      }

      await auth.checkPassword(args.password, user.password);

      const payload = { user: { id: user.id } };

      await auth.sendCookie(ctx.res, payload);

      return user;
    },

    signOut: async (parent, args, ctx, info) => {
      await ctx.res.clearCookie('token');

      return true;
    },

    requestReset: async (parent, args, ctx, info) => {
      const email = args.email.toLowerCase();

      const user = ctx.prisma.query.user({ where: { email } });

      if (!user) {
        throw new UserInputError(`No account found for ${email}`);
      }

      const { resetToken, resetTokenExpiry } = await auth.genResetToken();

      ctx.prisma.mutation.updateUser({
        where: { email },
        data: { resetToken, resetTokenExpiry }
      });

      await mail.mailResetToken(email, resetToken, resetTokenExpiry);

      return true;
    },

    resetPassword: async (parent, args, ctx, info) => {
      auth.validatePassword(args.password);
      auth.comparePasswords(args.password, args.confirmPassword);

      const [user] = ctx.prisma.query.users({
        where: { resetToken: args.resetToken }
      });

      if (!user) {
        throw new AuthenticationError(
          'Your reset token is invalid.  Please request a new one.'
        );
      }

      auth.validateTokenExpiry(user.resetTokenExpiry);

      const password = await bcrypt.hash(args.password, config.saltRounds);

      const updatedUser = ctx.prisma.mutation.updateUser({
        where: { email: user.email },
        data: {
          password,
          resetToken: null,
          resetTokenExpiry: null
        }
      });

      const payload = { user: { id: updatedUser.id } };

      await auth.sendCookie(ctx.res, payload);

      return updatedUser;
    }
  },

  // Further resolvers to resolve the connections on a per-field level
  // The root (parent) resolver that ran, passes its data to any per-field resolvers

  User: {
    ideas: (parent, args, ctx, info) => {
      console.log('user parent: ', parent);

      // return ctx.prisma.query.user({ where: { id: parent.id } }).ideas();

      return ctx.prisma.query.ideas({
        where: { author: { id: parent.ideas.id } }
      });
    }
  }
};
