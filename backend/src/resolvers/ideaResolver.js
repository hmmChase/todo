import {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from 'apollo-server-express';

import * as auth from '../utils/auth';

export default {
  Query: {
    idea: (parent, args, ctx, info) => {
      // Find and return idea matching ID
      return ctx.prisma.query.idea({ where: { id: args.id } }, info);
    },

    ideas: async (parent, args, ctx, info) => {
      // Return all ideas
      return ctx.prisma.query.ideas({ orderBy: args.orderBy }, info);
    },

    ideasConnection: (parent, args, ctx, info) => {
      return ctx.prisma.query.ideasConnection({}, info);
    },

    currentUserPaginatedIdeas: async (parent, args, ctx, info) => {
      console.log('TCL: args', args);
      // if no token cookie present, return null
      if (!ctx.req && !ctx.req.cookies && !ctx.req.cookies.token) return null;

      // Verify cookie and decode payload
      const currentUser = auth.verifyJWT(ctx.req.cookies.token);

      return await ctx.prisma.query.ideasConnection(
        { where: { author: { id: currentUser.user.id } } },
        info
      );
    }
  },

  Mutation: {
    createIdea: (parent, args, ctx, info) => {
      // Check if token is available
      if (!ctx.req && !ctx.req.cookies && !ctx.req.cookies.token)
        throw new AuthenticationError('Must be signed in.');

      // Get current user from JWT
      const currentUser = auth.verifyJWT(ctx.req.cookies.token);

      // Call mutation
      return ctx.prisma.mutation.createIdea(
        {
          data: {
            content: args.content,
            author: { connect: { id: currentUser.user.id } }
          }
        },
        info
      );
    },

    updateIdea: async (parent, args, ctx, info) => {
      // Check if token is available
      if (!ctx.req && !ctx.req.cookies && !ctx.req.cookies.token)
        throw new AuthenticationError('Must be signed in.');

      // Get current user from JWT
      const currentUser = auth.verifyJWT(ctx.req.cookies.token);

      // Request idea's author ID using defined selection set
      const idea = await ctx.prisma.query.idea(
        { where: { id: args.id } },
        `{ author { id }}`
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

      // Get current user from JWT
      const currentUser = auth.verifyJWT(ctx.req.cookies.token);

      // Request idea's author ID using defined selection set
      const idea = await ctx.prisma.query.idea(
        { where: { id: args.id } },
        `{ author { id }}`
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
