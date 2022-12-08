// https://www.apollographql.com/docs/apollo-server/data/resolvers

import bcryptjs from 'bcryptjs';

import { AuthenticationError, UserInputError } from '../../utils/error.js';
import {
  sendPassResetReqEmail,
  sendSignUpEmail
} from '../../handlers/emailHandler.js';
import {
  createAccessToken,
  verifyAccessToken
} from '../../utils/accessToken.js';
import { consoleLog } from '../../utils/myLogger.js';
import { createPassReset, validatePassReset } from '../../utils/passReset.js';
import { development, passwordHashSaltRounds } from '../../constants/config.js';
import { passwordCompare } from '../../utils/user.js';
import { validateInputs } from '../../utils/validateInputs.js';
import accessCookieOptions from '../../constants/cookie.js';

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
            email: true,
            role: true,
            ideas: { select: { id: true, content: true } }
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
          select: {
            id: true,
            email: true,
            role: true,
            ideas: { select: { id: true, content: true } }
          }
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
      if (!ctx.accessToken) throw AuthenticationError('no access token');

      // Verify access token & decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Find user matching user id
        const user = await ctx.prisma.user.findUnique({
          where: { id: payload.user.id },
          select: {
            id: true,
            email: true,
            role: true,
            ideas: { select: { id: true, content: true } }
          }
        });

        const currentTime = (new Date().getTime() + 1) / 1000;
        const oneDay = 86400000;
        const isLessThanOneDay = currentTime + oneDay < payload.exp;

        //? Refresh access token if within 1 day of expiration
        if (isLessThanOneDay) {
          // Create access token
          const accessToken = createAccessToken({ user });

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
      const { email, password } = validateInputs({ ...input });

      try {
        // Find user matching email
        const user = await ctx.prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            role: true,
            password: true,
            ideas: { select: { id: true, content: true } }
          }
        });

        // If user not found, throw error with display code
        if (!user)
          throw UserInputError('user not found', {
            displayCode: 'user.null'
          });

        // Check if input password matches user password
        await passwordCompare(password, user.password);

        // VERY IMPORTANT
        delete user.password;

        // Create access token
        const accessToken = createAccessToken({ user });

        // Set new access cookie
        ctx.res.cookie('access', accessToken, accessCookieOptions);

        // Return user
        return { user };
      } catch (error) {
        // UserInputError gets caught here
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
      const { email, password } = validateInputs({ ...input });

      try {
        // Check if account already exists
        const foundUser = await ctx.prisma.user.findUnique({
          where: { email },
          select: { id: true }
        });

        // If user found, throw error with display code
        if (foundUser)
          throw UserInputError('user already exists', {
            displayCode: 'user.exists'
          });

        /**
        // Encrypt password
        const hash = crypto
          .pbkdf2Sync(password, passwordHashSaltRounds, 1000, 64, 'sha512')
          .toString('hex');

        const hashedPassword = await argon2.hash(
          newPassword,
          passwordHashSaltRounds
        );
        */

        // Encrypt password
        const passwordHashed = await bcryptjs.hash(
          password,
          passwordHashSaltRounds
        );

        // Create user
        const createdUser = await ctx.prisma.user.create({
          data: { email, password: passwordHashed },
          select: { id: true, email: true, role: true }
        });

        // Create access token
        const accessToken = createAccessToken({ user: createdUser });

        // Set new access cookie
        ctx.res.cookie('access', accessToken, accessCookieOptions);

        // Send welcome email
        sendSignUpEmail(email);

        // Return user
        return { user: createdUser };
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Send password reset request email */
    passResetReq: async (parent, args, ctx, info) => {
      const { input } = args;

      // Normalize & validate inputs
      const { email } = validateInputs({ ...input });

      try {
        // Find user matching email
        const user = await ctx.prisma.user.findUnique({
          where: { email },
          select: { id: true }
        });

        // If user not found, throw error with display code
        if (!user)
          throw UserInputError('user not found', {
            displayCode: 'user.null'
          });

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
      const { password } = validateInputs({ password: newPassword });

      try {
        // Find user matching password reset token
        const foundUser = await ctx.prisma.user.findUnique({
          where: {
            passResetToken

            // passResetExpiry: {
            //   // if the expiration is after right now, it's valid
            //   gt: Date.now()
            // }
          },
          select: { id: true, passResetExpiry: true }
        });

        // If user not found, return error
        if (!foundUser) throw UserInputError({ msg: 'user.null' });

        // Check if password reset token is expired
        validatePassReset(foundUser.passResetExpiry);

        // Encrypt new password
        const passwordHashed = await bcryptjs.hash(
          password,
          passwordHashSaltRounds
        );

        // Update user with new password & clear password reset token & expiry
        const updatedUser = await ctx.prisma.user.update({
          where: { id: foundUser.id },
          data: {
            password: passwordHashed,
            passResetExpiry: null,
            passResetToken: null
          },
          select: {
            id: true,
            email: true,
            role: true,
            ideas: { select: { id: true, content: true } }
          }
        });

        // Create access token
        const accessToken = createAccessToken({ user: updatedUser });

        // Set new access cookie
        ctx.res.cookie('access', accessToken, accessCookieOptions);

        // Return user
        return { user: updatedUser };
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
