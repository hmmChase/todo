import { authAccessToken, newAccessToken } from '../../utils/accessToken.js';
import { createPassReset, validatePassReset } from '../../utils/passReset.js';
import { development, passHashSaltRounds } from '../../constants/config.js';
import { passwordCompare } from '../../utils/user.js';
import {
  sendPassResetReqEmail,
  sendSignUpEmail
} from '../../handlers/emailHandler.js';
import accessCookieOptions from '../../constants/cookie.js';
import bcryptjs from 'bcryptjs';
import consoleLog from '../../utils/consoleLog.js';
import GQLError from '../../utils/GQLError.js';
import validate from '../../utils/validate.js';

const userResolver = {
  Query: {
    /* Return user matching id */
    user: async (parent, args, ctx, info) => {
      const { id } = args;

      try {
        // Find user matching user id
        const user = await ctx.prisma.user.findUnique({
          where: { id },
          select: {
            id: true,
            createdAt: true,
            email: true,
            role: true,
            ideas: {
              select: { id: true, createdAt: true, author: true, content: true }
            }
          }
        });

        // Return user
        return user;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return all users */
    users: async (parent, args, ctx, info) => {
      try {
        // Find all users
        const users = await ctx.prisma.user.findMany({
          select: { id: true, createdAt: true, email: true, role: true }
        });

        // Return users
        return users;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return authenticated user */
    currentUser: async (parent, args, ctx, info) => {
      // If user not logged in, return null
      if (!ctx.accessToken)
        GQLError(401, 'currentUserIdeas', 'user.error.notLoggedIn');

      // Verify access token & decode payload
      const payload = authAccessToken(ctx.accessToken);

      try {
        // Find user matching user id
        const user = await ctx.prisma.user.findUnique({
          where: { id: payload.id },
          select: { id: true, role: true }
        });

        const currentTime = (new Date().getTime() + 1) / 1000;
        const oneDay = 86400000;
        const isLessThanOneDay = currentTime + oneDay < payload.exp;

        //? Refresh access token if within 1 day of expiration
        if (isLessThanOneDay) {
          // Create access token
          const accessToken = newAccessToken({ id: user.id });

          // Set new access cookie
          ctx.res.cookie('access', accessToken, accessCookieOptions);
        }

        // Return user
        return user;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    }
  },

  Mutation: {
    /* Authenticate user */
    logIn: async (parent, args, ctx, info) => {
      const { input } = args;

      // Normalize & validate inputs
      const { email, password } = validate({ ...input });

      try {
        // Find user matching email
        const user = await ctx.prisma.user.findUnique({
          where: { email },
          select: { id: true, role: true, password: true }
        });

        // If user not found, throw error
        if (!user) GQLError(404, 'logIn', 'user.null');

        // Check if input password matches user password
        await passwordCompare(password, user.password);

        // VERY IMPORTANT
        delete user.password;

        // Create access token
        const accessToken = newAccessToken({ id: user.id });

        // Set new access cookie
        ctx.res.cookie('access', accessToken, accessCookieOptions);

        // Return user
        return user;
      } catch (error) {
        // GraphQLError gets caught here
        development && consoleLog(error);

        // Throw caught error, else generic error is returned
        throw error;
      }
    },

    /* Clear authenticated user */
    logOut: (parent, args, ctx, info) => {
      // Needed to delete cookie
      delete accessCookieOptions.maxAge;

      // Delete cookie
      ctx.res.clearCookie('access', accessCookieOptions);

      // Return boolean
      return true;
    },

    /* Create & authenticate new user */
    signUp: async (parent, args, ctx, info) => {
      const { input } = args;

      // Normalize & validate inputs
      const { email, password } = validate({ ...input });

      try {
        // Check if email already used
        const user = await ctx.prisma.user.findUnique({
          where: { email },
          select: { id: true, role: true }
        });

        // If user found, throw error
        if (user) GQLError(409, 'signUp', 'user.exists');

        /**
        // Encrypt password
        const hash = crypto
          .pbkdf2Sync(password, passHashSaltRounds, 1000, 64, 'sha512')
          .toString('hex');

        const hashedPassword = await argon2.hash(
          newPassword,
          passHashSaltRounds
        );
        */

        // Encrypt password
        const passwordHashed = await bcryptjs.hash(
          password,
          passHashSaltRounds
        );

        // Create user
        const createdUser = await ctx.prisma.user.create({
          data: { email, password: passwordHashed },
          select: { id: true, role: true }
        });

        // Create access token
        const accessToken = newAccessToken({ id: createdUser.id });

        // Set new access cookie
        ctx.res.cookie('access', accessToken, accessCookieOptions);

        // Send welcome email
        sendSignUpEmail(email);

        // Return user
        return createdUser;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Send password reset request email */
    passResetReq: async (parent, args, ctx, info) => {
      const { input } = args;

      // Normalize & validate inputs
      const { email } = validate({ ...input });

      try {
        // Find user matching email
        const user = await ctx.prisma.user.findUnique({
          where: { email },
          select: { id: true }
        });

        // If user not found, throw error
        if (!user) GQLError(404, 'passResetReq', 'user.null');

        // Generate password reset token & expiration
        const [passResetExpiry, passResetToken] = await createPassReset();

        // Update user with password reset token & expiration
        await ctx.prisma.user.update({
          where: { id: user.id },
          data: { passResetExpiry, passResetToken }
        });

        // Send email with password reset link
        sendPassResetReqEmail(email, passResetExpiry, passResetToken);

        // Return boolean
        return true;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Reset user password */
    passReset: async (parent, args, ctx, info) => {
      const { newPassword, passResetToken } = args;

      // Normalize & validate inputs
      const { password } = validate({ password: newPassword });

      try {
        // Find user matching password reset token
        const user = await ctx.prisma.user.findUnique({
          where: {
            passResetToken

            // passResetExpiry: {
            //   // if the expiration is after right now, it's valid
            //   gt: Date.now()
            // }
          },
          // select: { id: true, passResetExpiry: true }
          select: { passResetExpiry: true }
        });

        // If user not found, throw error
        if (!user) GQLError(404, 'passReset', 'user.null');

        // Check if password reset token is expired
        validatePassReset(user.passResetExpiry);

        // Encrypt new password
        const passwordHashed = await bcryptjs.hash(
          password,
          passHashSaltRounds
        );

        // Update user with new password & clear password reset token & expiry
        const updatedUser = await ctx.prisma.user.update({
          where: { id: user.id },
          data: {
            passResetExpiry: null,
            passResetToken: null,
            password: passwordHashed
          },
          select: { id: true, role: true }
        });

        // Create access token
        const accessToken = newAccessToken({ id: updatedUser.id });

        // Set new access cookie
        ctx.res.cookie('access', accessToken, accessCookieOptions);

        // Return user
        return { success: true, user: updatedUser };
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    }
  }

  // User: {
  //   ideas: async (parent, args, ctx, info) => {}
  // }
};

export default userResolver;
