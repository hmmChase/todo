// https://www.apollographql.com/docs/apollo-server/data/resolvers

import { UserInputError } from 'apollo-server-express';
import bcryptjs from 'bcryptjs';

import { accessCookieOptions } from '../../constants/cookie.js';
import { createAccessToken } from '../../utils/accessToken.js';
import { createPassReset, validatePassReset } from '../../utils/passReset.js';
import { createUserObj, passwordCompare } from '../../utils/user.js';
import { passwordHashSaltRounds } from '../../constants/config.js';
import { sendPassResetReqEmail } from '../../handlers/emailHandler.js';
import { validateInputs } from '../../utils/validateInputs.js';
import { verifyAccessToken } from '../../utils/accessToken.js';

const userResolver = {
  Query: {
    // Return user matching id
    user: async (parent, args, ctx, info) => {
      const { id } = args;

      // Validate id
      if (!id || typeof id !== 'string')
        throw new UserInputError('invalid', { argumentName: 'id' });

      try {
        // Find user matching user id
        const foundUser = await ctx.prisma.user.findUnique({
          where: { id },
          select: { id: true, email: true, role: true }
        });

        // If user not found, return nothing
        if (!foundUser) return null;

        // Create user object
        const user = createUserObj(foundUser);

        // Return user
        return user;
      } catch (error) {
        console.log('user user error: ', error);

        throw error;
      }
    },

    // Return all users
    users: async (parent, args, ctx, info) => {
      try {
        // Find all users
        const foundUsers = await ctx.prisma.user.findMany({
          select: { id: true, email: true, role: true }
        });

        // If users not found, return nothing
        if (!foundUsers) return null;

        const users = foundUsers.map(userRecord => {
          // Create user object
          const user = createUserObj(userRecord);

          // Return user
          return user;
        });

        // Return users
        return users;
      } catch (error) {
        console.log('user users error: ', error);

        throw error;
      }
    },

    // Return authenticated user
    currentUser: async (parent, args, ctx, info) => {
      // If user not logged in, return null
      if (!ctx.accessToken) return null;

      // Verify access token & decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Find user matching user id
        const foundUser = await ctx.prisma.user.findUnique({
          where: { id: payload.user.id },
          select: { id: true, email: true, role: true }
        });

        // If user not found, return nothing
        if (!foundUser) return null;

        // Create user object
        const user = createUserObj(foundUser);

        const currentTime = (new Date().getTime() + 1) / 1000;
        const oneDay = 86400000;
        const isLessThanOneDay = currentTime + oneDay < payload.exp;

        //? Refresh access token if within 1 day of expiration
        if (isLessThanOneDay) {
          // Create access token
          const accessToken = createAccessToken(user);

          // Set new access cookie
          ctx.res.cookie('access', accessToken, accessCookieOptions);
        }

        // Return user
        return user;
      } catch (error) {
        console.log('user currentUser error: ', error);

        throw error;
      }
    }
  },

  Mutation: {
    logIn: async (parent, args, ctx, info) => {
      const { input } = args;

      // Normalize & validate inputs
      const { email, password } = validateInputs({ ...input });

      try {
        // Find user matching email
        const foundUser = await ctx.prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, password: true, role: true }
        });

        // If user not found, return error
        if (!foundUser) throw new UserInputError({ msg: 'user.null' });

        // Check if input password matches users password
        await passwordCompare(password, foundUser.password);

        // Create user object
        const user = createUserObj(foundUser);

        // Create access token
        const accessToken = createAccessToken(user);

        // Set new access cookie
        ctx.res.cookie('access', accessToken, accessCookieOptions);

        // Return user
        return user;
      } catch (error) {
        console.log('user logIn error: ', error);

        throw error;
      }
    },

    logOut: (parent, args, ctx, info) => {
      // Needed to delete cookie
      delete accessCookieOptions.maxAge;

      // Delete cookie
      ctx.res.clearCookie('access', accessCookieOptions);

      return true;
    },

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

        // If user found, return error
        if (foundUser) throw new UserInputError({ msg: 'user.exists' });

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

        // Create user object
        const user = createUserObj(createdUser);

        // Create access token
        const accessToken = createAccessToken(user);

        // Set new access cookie
        ctx.res.cookie('access', accessToken, accessCookieOptions);

        // Send welcome email
        sendSignUpEmail(email);

        // Return user
        return user;
      } catch (error) {
        console.log('user signUp error: ', error);

        throw error;
      }
    },

    passResetReq: async (parent, args, ctx, info) => {
      const { input } = args;

      // Normalize & validate inputs
      const { email } = validateInputs({ ...input });

      try {
        // Find user matching email
        const foundUser = await ctx.prisma.user.findUnique({
          where: { email },
          select: { id: true }
        });

        // If user not found, return same as found user
        if (!foundUser) return true;

        // Generate password reset token & expiration
        const [passResetExpiry, passResetToken] = await createPassReset();

        // Update user with password reset token & expiration
        await ctx.prisma.user.update({
          where: { id: foundUser.id },
          data: { passResetExpiry, passResetToken }
        });

        // Send email with password reset link
        sendPassResetReqEmail(email, passResetExpiry, passResetToken);

        // Return boolean
        return true;
      } catch (error) {
        console.log('user passResetReq error: ', error);

        throw error;
      }
    },

    passReset: async (parent, args, ctx, info) => {
      const { newPassword, passResetToken } = args;

      if (!newPassword || !passResetToken)
        throw new UserInputError('missing', {
          argumentName:
            (!newPassword && 'newPassword') ||
            (!passResetToken && 'passResetToken')
        });

      // Normalize & validate inputs
      const { password } = validateInputs({ password: newPassword });

      try {
        // Find user matching password reset token
        const foundUser = await prisma.user.findUnique({
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
        if (!foundUser) throw new UserInputError({ msg: 'user.null' });

        // Check if password reset token is expired
        validatePassReset(foundUser.passResetExpiry);

        // Encrypt new password
        const passwordHashed = await bcryptjs.hash(
          password,
          passwordHashSaltRounds
        );

        // Update user with new password & clear password reset token & expiry
        const updatedUser = await prisma.user.update({
          where: { id: foundUser.id },
          data: {
            password: passwordHashed,
            passResetExpiry: null,
            passResetToken: null
          },
          select: { id: true, email: true, role: true }
        });

        // Create user object
        const user = createUserObj(updatedUser);

        // Create access token
        const accessToken = createAccessToken(user);

        // Set new access cookie
        ctx.res.cookie('access', accessToken, accessCookieOptions);

        // Return user
        return user;
      } catch (error) {
        console.log('user passReset error: ', error);

        throw error;
      }
    }
  }

  // User: {
  //   ideas: async (parent, args, ctx, info) => {}
  // }
};

export default userResolver;
