import {
  AuthenticationError,
  ForbiddenError,
  _UserInputError,
} from 'apollo-server-express';

import * as auth from '../utils/auth';

export default {
  Query: {
    idea: (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token
      auth.verifyAccessToken(ctx.accessToken);

      // Find and return idea matching ID
      return ctx.prisma.query.idea({ where: { id: args.id } }, info);
    },

    ideas: async (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token
      auth.verifyAccessToken(ctx.accessToken);

      // Return all ideas
      return ctx.prisma.query.ideas({ orderBy: args.orderBy }, info);
    },

    ideasConnection: (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token
      auth.verifyAccessToken(ctx.accessToken);

      // Return all ideas
      return ctx.prisma.query.ideasConnection({}, info);
    },

    currentUserIdea: async (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token and decode payload
      const payload = auth.verifyAccessToken(ctx.accessToken);

      // Find idea matching ID
      const idea = await ctx.prisma.query.idea(
        { where: { id: args.id } },
        info
      );

      // Verify current user owns idea
      const ownsIdea = payload.userId === idea.author.id;

      // If not, throw error
      if (!ownsIdea) throw new ForbiddenError("That's not your idea.");

      // If so, return idea
      return idea;
    },

    currentUserIdeas: async (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token and decode payload
      const payload = auth.verifyAccessToken(ctx.accessToken);

      // Find and return all ideas matching userId
      return await ctx.prisma.query.ideas(
        { where: { author: { id: payload.userId } } },
        info
      );
    },

    currentUserPaginatedIdeas: async (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token and decode payload
      const payload = auth.verifyAccessToken(ctx.accessToken);

      // Find and return all ideas matching userId
      return await ctx.prisma.query.ideasConnection(
        { where: { author: { id: payload.userId } } },
        info
      );
    },
  },

  Mutation: {
    createIdea: (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token and decode payload
      const payload = auth.verifyAccessToken(ctx.accessToken);

      // Create and return idea
      return ctx.prisma.mutation.createIdea(
        {
          data: {
            content: args.content,
            author: { connect: { id: payload.userId } },
          },
        },
        info
      );
    },

    updateIdea: async (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token and decode payload
      const payload = auth.verifyAccessToken(ctx.accessToken);

      // Request idea's author ID using defined selection set
      const idea = await ctx.prisma.query.idea(
        { where: { id: args.id } },
        `{ author { id }}`
      );

      // Check if they own that idea
      const ownsIdea = idea.author.id === payload.userId;

      // If not, throw error
      if (!ownsIdea) throw new ForbiddenError("That's not your idea.");

      // If so, update and return idea
      return ctx.prisma.mutation.updateIdea({
        where: { id: args.id },
        data: { content: args.content },
      });
    },

    deleteIdea: async (parent, args, ctx, info) => {
      // If no access token, throw error
      if (!ctx.accessToken) throw new AuthenticationError('Must be signed in.');

      // Verify access token and decode payload
      const payload = auth.verifyAccessToken(ctx.accessToken);

      // Request idea's author ID using defined selection set
      const idea = await ctx.prisma.query.idea(
        { where: { id: args.id } },
        `{ author { id }}`
      );

      // Check if they own that idea
      const ownsIdea = idea.author.id === payload.userId;

      // If not, throw error
      if (!ownsIdea) throw new ForbiddenError("That's not your idea.");

      // If so, delete idea and return idea ID
      return ctx.prisma.mutation.deleteIdea({ where: { id: args.id } });
    },
  },
};
