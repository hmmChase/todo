import { AuthenticationError } from 'apollo-server-express';

import { createAccessToken, verifyAccessToken } from '../../utils/accessToken';
import userClientCleaner from '../../utils/userClientCleaner';
import { COOKIE_CONFIG } from '../../config';
import {
  isEmailWellFormed,
  isPasswordWellFormed,
  validatePassword
} from '../../utils/validation';

export default {
  Query: {
    // Return user matching id
    user: async (parent, args, ctx, info) => {
      const { id } = args;

      // Convert string to number
      const numId = Number(id);

      // Check if missing args
      if (!id) throw new AuthenticationError('error.missingArgument');

      // Check if id is syntactically valid
      if (typeof numId !== 'number')
        throw new AuthenticationError('error.invalidArgument');

      try {
        // Find user matching userId
        const userRecord = await ctx.prisma.user.findUnique({
          where: { id: numId }
        });

        // Clean user data for client
        const clientUserData = userClientCleaner(userRecord);

        // Return user data
        return clientUserData;
      } catch (error) {
        console.log('user.user error: ', error);

        return {};
      }
    },

    // Return all users
    users: async (parent, args, ctx, info) => {
      try {
        // Find all users
        const userRecords = await ctx.prisma.user.findMany();

        // Clean users data for client
        const clientUsersData = userRecords.map(user =>
          userClientCleaner(user)
        );

        // Return users data
        return clientUsersData;
      } catch (error) {
        console.log('user.users error: ', error);

        return {};
      }
    },

    // Return authenticated user
    currentUser: async (parent, args, ctx, info) => {
      // If no access token, return error
      if (!ctx.accessToken)
        return new AuthenticationError('user.invalidCredentials');

      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Find user matching userId
        const userRecord = await ctx.prisma.user.findUnique({
          where: { id: payload.userId }
        });

        // If no user found, return error
        if (!userRecord) return AuthenticationError('user.notFound');

        // Create new access token
        const accessToken = createAccessToken(userRecord.id);

        // Send back new access token
        ctx.res.cookie('at', accessToken, COOKIE_CONFIG);

        // Clean user data for client
        const clientUserData = userClientCleaner(userRecord);

        // Return user data
        return clientUserData;
      } catch (error) {
        console.log('user.currentUser error: ', error);

        return {};
      }
    }
  },

  Mutation: {
    logIn: async (parent, args, ctx, info) => {
      const { email, password } = args;

      // Check if missing args
      if (!email || !password)
        throw new AuthenticationError('login.missingCredentials');

      // Check if email and password are syntactically valid
      if (!isEmailWellFormed || !isPasswordWellFormed)
        throw new AuthenticationError('login.invalidCredentials');

      try {
        // Find user matching email
        const userRecord = await ctx.prisma.user.findUnique({
          where: { email }
        });

        // If user not found, return error
        if (!userRecord)
          throw new AuthenticationError('login.invalidCredentials');

        // Check if password input matches users password
        validatePassword(password, userRecord.password);

        // Create access token
        const accessToken = createAccessToken(userRecord.id);

        // Send back new access token
        ctx.res.cookie('at', accessToken, COOKIE_CONFIG);

        // Clean user data for client
        const clientUserData = userClientCleaner(userRecord);

        // Return user data
        return { user: clientUserData };
      } catch (error) {
        console.log('user.logIn error: ', error);

        return {};
      }
    }
  }
};
