// https://www.apollographql.com/docs/apollo-server/data/resolvers

import { UserInputError } from 'apollo-server-express';
import bcryptjs from 'bcryptjs';

import { verifyAccessToken } from '../../utils/accessToken.js';
import {
  createUserObj,
  createUserObjandPayload,
  passwordCompare
} from '../../utils/user.js';
import { validateInputs } from '../../utils/validateInputs.js';
import { passwordHashSaltRounds } from '../../constants/config.js';
import { cookieOptions } from '../../constants/cookie.js';
import { sendPassResetEmail } from '../../handlers/emailHandler.js';
import {
  createResetPassToken,
  validateResetPassTokenExpiry
} from '../../utils/resetPassToken.js';

const userResolver = {
  Query: {
    // Return user matching id
    user: async (parent, args, ctx, info) => {
      const { id } = args;

      // Check if missing args
      if (!id) throw new UserInputError('user.error.user.missing');

      // Convert string to number
      const numId = Number(id);

      // Type check
      if (typeof numId !== 'number')
        throw new UserInputError('user.error.user.invalid');

      try {
        // Find user matching user id
        const userRecord = await ctx.prisma.user.findUnique({
          where: { id: numId },
          select: { id: true, email: true, role: true }
        });

        // Create user object
        const user = createUserObj(userRecord);

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
        const userRecords = await ctx.prisma.user.findMany({
          select: { id: true, email: true, role: true }
        });

        const users = userRecords.map(userRecord => {
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
        // Find user matching userId
        const userRecord = await ctx.prisma.user.findUnique({
          where: { id: payload.userId },
          select: { id: true, email: true, role: true }
        });

        // If no user found, return nothing
        if (!userRecord) return null;

        let currentUser = {};

        const currentTime = (new Date().getTime() + 1) / 1000;
        const oneDay = 86400000;
        const isLessThanOneDay = currentTime + oneDay < payload.exp;

        // Refresh access token if within 1 day of expiration
        if (isLessThanOneDay) {
          // Create user object & access token
          const [user, accessToken] = createUserObjandPayload(userRecord);

          currentUser = user;

          // Set new access token cookie
          ctx.res.cookie('at', accessToken, cookieOptions);
        } else {
          // Create user object
          currentUser = createUserObj(userRecord);
        }

        // Return user
        return currentUser;
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
        const userRecord = await ctx.prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, password: true, role: true }
        });

        // If user not found, return error
        if (!userRecord) throw new UserInputError('user.error.logIn.notFound');

        // Check if input password matches users password
        await passwordCompare(password, userRecord.password);

        // Create user object & access token
        const [user, accessToken] = createUserObjandPayload(userRecord);

        // Set new access token cookie
        ctx.res.cookie('at', accessToken, cookieOptions);

        // Return user
        return user;
      } catch (error) {
        console.log('user logIn error: ', error);

        throw error;
      }
    },

    logOut: (parent, args, ctx, info) => {
      // const cookie = serialize('at', '', { maxAge: -1, path: '/' });
      // ctx.res.setHeader('Set-Cookie', cookie);

      // delete cookieOptions.expires;

      // Needed to delete cookie
      delete cookieOptions.maxAge;

      // Delete cookie
      ctx.res.clearCookie('at', cookieOptions);

      return true;
    },

    createUser: async (parent, args, ctx, info) => {
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
        if (foundUser) throw new UserInputError('user.error.createUser.exists');

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
        const userRecord = await ctx.prisma.user.create({
          data: { email, password: passwordHashed },
          select: { id: true, email: true, role: true }
        });

        // Create user object & access token
        const [user, accessToken] = createUserObjandPayload(userRecord);

        // Set new access token cookie
        ctx.res.cookie('at', accessToken, cookieOptions);

        // Return user
        return user;
      } catch (error) {
        console.log('user createUser error: ', error);

        throw error;
      }
    },

    reqPassReset: async (parent, args, ctx, info) => {
      // Normalize & validate inputs
      const { email } = validateInputs({ email: args.email });

      try {
        // Find user matching email
        const foundUser = await ctx.prisma.user.findUnique({
          where: { email },
          select: { id: true }
        });

        // If user not found, return same as found user
        if (!foundUser) return true;

        // Generate reset password token & expiration
        const [resetPassToken, resetPassTokenExpiry] =
          await createResetPassToken();

        // Update user with reset password token & expiration
        await ctx.prisma.user.update({
          where: { id: foundUser.id },
          data: { resetPassToken, resetPassTokenExpiry }
        });

        // Send email with reset password link
        sendPassResetEmail(email, resetPassToken, resetPassTokenExpiry);

        // Return boolean
        return true;
      } catch (error) {
        console.log('user reqPassReset error: ', error);

        throw error;
      }
    },

    changePassword: async (parent, args, ctx, info) => {
      const { resetPassToken, newPassword } = args;

      if (!resetPassToken || !newPassword)
        throw new UserInputError('user.error.changePassword.missing');

      // Normalize & validate inputs
      const { password } = validateInputs({ password: newPassword });

      try {
        // Find user matching reset password token
        const foundUser = await prisma.user.findUnique({
          where: {
            resetPassToken

            // resetPassTokenExpiry: {
            //   // if the expiration is after right now, it's valid
            //   gt: Date.now()
            // }
          },
          select: { id: true, resetPassTokenExpiry: true }
        });

        // If user not found, return error
        if (!foundUser)
          throw new UserInputError('user.error.changePassword.notFound');

        // Check if reset password token is expired
        validateResetPassTokenExpiry(foundUser.resetPassTokenExpiry);

        // Encrypt new password
        const passwordHashed = await bcryptjs.hash(
          password,
          passwordHashSaltRounds
        );

        // Update user with new password & clear reset password token & expiry
        const updatedUser = await prisma.user.update({
          where: { id: foundUser.id },
          data: {
            password: passwordHashed,
            resetPassToken: null,
            resetPassTokenExpiry: null
          },
          select: { id: true, email: true, role: true }
        });

        // Create user object & access token
        const [user, accessToken] = createUserObjandPayload(updatedUser);

        // Set new access token cookie
        ctx.res.cookie('at', accessToken, cookieOptions);

        // Return user
        return user;
      } catch (error) {
        console.log('user changePassword error: ', error);

        throw error;
      }
    }
  }

  // User: {
  //   ideas: async (parent, args, ctx, info) => {}
  // }
};

export default userResolver;
