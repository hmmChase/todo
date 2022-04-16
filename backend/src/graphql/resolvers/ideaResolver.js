import { ForbiddenError } from 'apollo-server-express';

import { consoleLog } from '../../utils/myLogger.js';
import { development } from '../../constants/config.js';
import { verifyAccessToken } from '../../utils/accessToken.js';

const ideaResolver = {
  Query: {
    /* Return idea matching ID */
    idea: async (parent, args, ctx, info) => {
      const { id } = args;

      try {
        // Find idea matching user id
        const idea = await ctx.prisma.idea.findUnique({
          where: { id },
          select: { id: true, content: true, author: { select: { id: true } } }
        });

        // Return idea
        return idea;
      } catch (error) {
        development && console.error(error.message);
      }
    },

    /* Return all ideas */
    ideas: async (parent, args, ctx, info) => {
      try {
        const ideas = await ctx.prisma.idea.findMany({
          where: { removedAt: null },
          select: { id: true, content: true, author: { select: { id: true } } },
          orderBy: { createdAt: 'desc' }
        });

        return ideas;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return offset paginated ideas */
    ideasPaginatedOffset: async (parent, args, ctx, info) => {
      const { offset, limit } = args;

      if ((!offset && offset !== 0) || !limit)
        throw new ForbiddenError(
          'idea.error.ideasPaginatedOffset.invalidOffsetOrLimit'
        );

      try {
        const ideas = await ctx.prisma.idea.findMany({
          skip: offset,
          take: limit, // first
          where: { removedAt: null },
          select: { id: true, content: true, author: { select: { id: true } } },
          orderBy: { createdAt: 'desc' }
        });

        return ideas;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return curser paginated ideas */
    ideasPaginatedCurser: async (parent, args, ctx, info) => {
      const { cursor, limit } = args;

      if (!cursor || !limit)
        throw new ForbiddenError(
          'idea.error.ideasPaginatedCurser.invalidCurserOrLimit'
        );

      try {
        const ideas = await ctx.prisma.idea.findMany({
          take: limit,
          cursor: { id: cursor },
          where: { removedAt: null },
          select: { id: true, content: true, author: { select: { id: true } } },
          orderBy: { createdAt: 'desc' }
        });

        return ideas;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return authenticated user's ideas */
    currentUserIdeas: async (parent, args, ctx, info) => {
      // If user not logged in, return null
      if (!ctx.accessToken) throw new AuthenticationError('no access token');
      // if (!ctx.accessToken) return null;

      // Verify access token & decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Find all ideas matching author id
        const ideas = await ctx.prisma.idea.findMany({
          where: { author: { id: payload.user.id }, removedAt: null },
          select: { id: true, content: true, author: { select: { id: true } } },
          orderBy: { createdAt: 'desc' }
        });

        return ideas;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    }

    // currentUserOffsetPaginatedIdeas: async (parent, args, ctx, info) => {
    //   const { skip, take } = args;

    //   // Verify access token and decode payload
    //   const payload = verifyAccessToken(ctx.accessToken);

    //   // Find and return paginated ideas matching user id
    //   const ideas = await prisma.idea.findMany({
    //     skip,
    //     take,
    //     where: { id: payload.userId }
    //   });

    //   return ideas;
    // },

    // currentUserCurserPaginatedIdeas: async (parent, args, ctx, info) => {
    //   const { skip, take } = args;

    //   // Verify access token and decode payload
    //   const payload = verifyAccessToken(ctx.accessToken);

    //   // // Find and return paginated ideas matching user id
    //   // const ideas = await prisma.idea.findMany({
    //   //   skip,
    //   //   take,
    //   //   where: { id: payload.user.id }
    //   // });

    //   // return ideas;

    //   const ideas = await ctx.prisma.idea.findMany({
    //     skip,
    //     take,
    //     where: { author: { id: payload.user.id } }
    //   });

    //   return {
    //     edges: ideas.map(idea => {
    //       return { node: idea };
    //     }),

    //     aggregate: { count: await ctx.prisma.user.count({ where: args.where }) }
    //   };
    // }
  },

  Mutation: {
    createIdea: (parent, args, ctx, info) => {
      const { content } = args;

      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Create idea
        const ideaRecord = ctx.prisma.idea.create({
          data: { content, author: { connect: { id: payload.user.id } } },
          select: { id: true, content: true, author: { select: { id: true } } }
        });

        // Return new idea
        return ideaRecord;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    updateIdea: async (parent, args, ctx, info) => {
      const { id, content } = args;

      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Request idea's author ID
        const idea = await ctx.prisma.idea.findUnique({
          where: { id },
          select: { author: { select: { id: true } } }
        });

        // Check if they own that idea
        const ownsIdea = idea.author.id === payload.user.id;

        // If not, throw error
        if (!ownsIdea)
          throw new ForbiddenError('idea.error.updateIdea.invalidOwnership');

        // Update idea
        const updatedIdea = ctx.prisma.idea.update({
          where: { id },
          data: { content },
          select: { id: true, content: true, author: { select: { id: true } } }
        });

        return updatedIdea;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    removeIdea: async (parent, args, ctx, info) => {
      const { id } = args;

      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Request idea's author ID
        const idea = await ctx.prisma.idea.findUnique({
          where: { id },
          select: { author: { select: { id: true } } }
        });

        // Check if they own that idea
        const ownsIdea = idea.author.id === payload.userId;

        // If not, throw error
        if (!ownsIdea)
          throw new ForbiddenError('idea.error.removeIdea.invalidOwnership');

        // Update idea soft delete field
        const removedIdea = await prisma.idea.update({
          where: { id },
          data: { removedAt: new Date().toISOString() },
          select: { id: true }
        });

        // Return removed idea
        return removedIdea;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    deleteIdea: async (parent, args, ctx, info) => {
      const { id } = args;

      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Request idea's author ID
        const idea = await ctx.prisma.idea.findUnique({
          where: { id },
          select: { author: { select: { id: true } } }
        });

        // Check if they own that idea
        const ownsIdea = idea.author.id === payload.user.id;

        // If not, throw error
        if (!ownsIdea)
          throw new ForbiddenError('idea.error.deleteIdea.invalidOwnership');

        // Delete idea
        const deletedIdea = ctx.prisma.idea.delete({
          where: { id },
          select: { id: true }
        });

        // Return deleted idea
        return deletedIdea;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    }
  }
};

export default ideaResolver;
