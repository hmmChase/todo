import {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from 'apollo-server-express';

import * as auth from '../utils/auth';

export default {
  Query: {
    idea: (parent, args, ctx, info) => {
      return ctx.prisma.query.idea({ where: { id: args.id } }, info);
    },

    ideas: async (parent, args, ctx, info) => {
      return ctx.prisma.query.ideas({}, info);
    }
  },

  Mutation: {
    createIdea: async (parent, args, ctx, info) => {
      // Check if token is available
      if (!ctx.req && !ctx.req.cookies && !ctx.req.cookies.token)
        throw new AuthenticationError('Must be signed in.');

      // Get current user
      const currentUser = await auth.verifyJWT(ctx.req.cookies.token);

      // Call mutation
      return ctx.prisma.mutation.createIdea({
        data: {
          author: { connect: { id: currentUser.user.id } },
          content: args.content
        }
      });
    },

    updateIdea: async (parent, args, ctx, info) => {
      // Check if token is available
      if (!ctx.req && !ctx.req.cookies && !ctx.req.cookies.token)
        throw new AuthenticationError('Must be signed in.');

      // Get current user
      const currentUser = await auth.verifyJWT(ctx.req.cookies.token);

      // find the item
      const idea = await ctx.prisma.query.idea(
        { where: { id: args.id } },
        `{ id author { id }}`
      );

      // Check if they own that idea
      const ownsIdea = idea.author.id === currentUser.user.id;

      // If not, throw error
      if (!ownsIdea) throw new ForbiddenError("That's not your idea.");

      // If so, call mutation
      return ctx.prisma.mutation.updateIdea({
        where: { id: args.id },
        data: { content: args.content }
      });
    },

    deleteIdea: async (parent, args, ctx, info) => {
      // Check if token is available
      if (!ctx.req && !ctx.req.cookies && !ctx.req.cookies.token)
        throw new ForbiddenError('Must be signed in.');

      // Get current user
      const currentUser = await auth.verifyJWT(ctx.req.cookies.token);

      // find the item
      const idea = await ctx.prisma.query.idea(
        { where: { id: args.id } },
        `{ id author { id }}`
      );

      // Check if they own that idea
      const ownsIdea = idea.author.id === currentUser.user.id;

      // If not, throw error
      if (!ownsIdea) throw new ForbiddenError("That's not your idea.");

      // If so, call mutation
      return ctx.prisma.mutation.deleteIdea({ where: { id: args.id } });
    }
  }
};
