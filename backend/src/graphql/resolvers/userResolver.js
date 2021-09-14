// https://www.apollographql.com/docs/apollo-server/data/resolvers

import {
  AuthenticationError,
  UserInputError,
  ForbiddenError
} from 'apollo-server-express';
import bcrypt from 'bcryptjs';

import {
  createAccessToken,
  refreshAccessToken,
  verifyAccessToken
} from '../../utils/accessToken';
import { userClientCleaner } from '../../utils/user';
import {
  isEmailWellFormed,
  isPasswordWellFormed,
  isPasswordValid
} from '../../utils/validation';
import { cookieOptions, saltRounds } from '../../config';

const userResolver = {
  Query: {
    // Return user matching id
    user: async (parent, args, ctx, info) => {
      const { id } = args;

      // Check if missing args
      if (!id) throw new ForbiddenError('error.missingArgument');

      // Convert string to number
      const numId = Number(id);

      // Type check
      if (typeof numId !== 'number')
        throw new ForbiddenError('error.invalidArgument');

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
      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Find user matching userId
        const userRecord = await ctx.prisma.user.findUnique({
          where: { id: payload.userId }
        });

        // If no user found, return error
        if (!userRecord) throw new AuthenticationError('user.notFound');

        // Send back new access token

        refreshAccessToken(ctx.res, userRecord.id);

        // Clean user data for client
        const clientUserData = userClientCleaner(userRecord);

        // Return user data
        return clientUserData;
      } catch (error) {
        console.log('user.currentUser error: ', error);

        throw new AuthenticationError('user.invalidCredentials');
      }
    }
  },

  Mutation: {
    logIn: async (parent, args, ctx, info) => {
      const {
        input: { email, password }
      } = args;

      // Check if missing args
      if (!email || !password)
        throw new ForbiddenError('login.missingCredentials');

      // Type check
      for (const input of [email, password])
        if (typeof input !== 'string')
          throw new UserInputError('error.invalidArgument');

      // Normalize email
      const emailNormalized = email.trim().toLowerCase();

      // Normalize password
      const passwordNormalized = email.trim();

      // Check if email is well-formed
      isEmailWellFormed(emailNormalized);

      // Check if password is well-formed
      isPasswordWellFormed(passwordNormalized);

      try {
        // Find user matching email
        const userRecord = await ctx.prisma.user.findUnique({
          where: { email: emailNormalized }
        });

        // If user not found, return error
        if (!userRecord) throw new UserInputError('login.invalidCredentials');

        // Check if password input matches users password
        isPasswordValid(password, userRecord.password);

        // Create access token
        const accessToken = createAccessToken(userRecord.id);

        // Send back new access token
        ctx.res.cookie('at', accessToken, cookieOptions);

        // Clean user data for client
        const clientUserData = userClientCleaner(userRecord);

        // Return user data
        return { user: clientUserData };
      } catch (error) {
        console.log('user.logIn error: ', error);

        return {};
      }
    },

    logOut: (parent, args, ctx, info) => {
      // const cookie = serialize('at', '', {
      //   maxAge: -1,
      //   path: '/'
      // });
      // ctx.res.setHeader('Set-Cookie', cookie);

      delete cookieOptions.expires;
      delete cookieOptions.maxAge;

      ctx.res.clearCookie('at', cookieOptions);

      return true;
    },

    createUser: async (parent, args, ctx, info) => {
      const { email, password } = args;

      // Check if missing args
      if (!(email || password))
        throw new ForbiddenError('error.missingArgument');

      // Type check
      for (const input of [email, password])
        if (typeof input !== 'string')
          throw new UserInputError('error.invalidArgument');

      // Normalize email
      const emailNormalized = email.trim().toLowerCase();

      // Normalize password
      const passwordNormalized = email.trim();

      // Check if email is well-formed
      isEmailWellFormed(emailNormalized);

      // Check if password is well-formed
      isPasswordWellFormed(passwordNormalized);

      try {
        // Find user matching email
        const foundUser = await ctx.prisma.user.findUnique({
          where: { email: emailNormalized }
        });

        // If user found, return error
        if (foundUser) throw new UserInputError('email.invalid');

        // Encrypt password
        const passwordHashed = await bcrypt.hash(
          passwordNormalized,
          saltRounds
        );

        // Create user
        const newUserRecord = await ctx.prisma.user.create({
          data: { email: emailNormalized, password: passwordHashed }
        });

        // Create access token
        const accessToken = createAccessToken(newUserRecord.id);

        // Send back new access token
        ctx.res.cookie('at', accessToken, cookieOptions);

        // Clean user data for client
        const clientUserData = userClientCleaner(newUserRecord);

        // Return user data
        return clientUserData;
      } catch (error) {
        console.log('user.signUp error: ', error);

        return {};
      }
    }
  }

  // User: {
  //   ideas: async (parent, args, ctx, info) => {}
  // }
};

export default userResolver;
