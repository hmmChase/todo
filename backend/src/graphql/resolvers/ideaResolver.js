import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

import { verifyAccessToken } from '../../utils/accessToken';

const ideaResolver = {
  Query: {
    // Return idea matching ID
    idea: async (parent, args, ctx, info) => {
      const { id } = args;

      try {
        const idea = await ctx.prisma.idea.findUnique({
          where: { id },
          select: { id: true, content: true, author: { select: { id: true } } }
        });

        return idea;
      } catch (error) {
        console.log('idea idea error: ', error);

        throw error;
      }
    },

    // Return all ideas
    ideas: async (parent, args, ctx, info) => {
      try {
        const ideas = await ctx.prisma.idea.findMany({
          where: { deletedAt: null },
          select: { id: true, content: true, author: { select: { id: true } } },
          orderBy: { createdAt: 'desc' }
        });

        return ideas;
      } catch (error) {
        console.log('idea ideas error: ', error);

        throw error;
      }
    },

    // Return offset paginated ideas
    ideasPaginatedOffset: async (parent, args, ctx, info) => {
      const { offset, limit } = args;

      if ((!offset && offset !== 0) || !limit)
        throw new ForbiddenError(
          'idea.ideasPaginatedOffset.invalidOffsetOrLimit'
        );

      try {
        const ideas = await ctx.prisma.idea.findMany({
          skip: offset,
          take: limit, // first
          where: { deletedAt: null },
          select: { id: true, content: true, author: { select: { id: true } } },
          orderBy: { createdAt: 'desc' }
        });

        return ideas;
      } catch (error) {
        console.log('idea ideasPaginatedOffset error: ', error);

        throw error;
      }
    },

    // Return curser paginated ideas
    ideasPaginatedCurser: async (parent, args, ctx, info) => {
      const { cursor, limit } = args;

      if (!cursor || !limit)
        throw new ForbiddenError(
          'idea.ideasPaginatedCurser.invalidCurserOrLimit'
        );

      try {
        const ideas = await ctx.prisma.idea.findMany({
          take: limit,
          cursor: { id: cursor },
          where: { deletedAt: null },
          select: { id: true, content: true, author: { select: { id: true } } },
          orderBy: { createdAt: 'desc' }
        });

        return ideas;
      } catch (error) {
        console.log('idea ideasPaginatedCurser error: ', error);

        throw error;
      }
    },

    currentUserIdeas: async (parent, args, ctx, info) => {
      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Find and return all ideas matching userId
        const ideas = await ctx.prisma.idea.findMany({
          where: { author: { id: payload.userId }, deletedAt: null },
          select: { id: true, content: true },
          orderBy: { createdAt: 'desc' }
        });

        return ideas;
      } catch (error) {
        console.log('idea currentUserIdeas error: ', error);

        throw error;
      }
    }

    // currentUserOffsetPaginatedIdeas: async (parent, args, ctx, info) => {
    //   const { skip, take } = args;

    //   // Verify access token and decode payload
    //   const payload = verifyAccessToken(ctx.accessToken);

    //   // Find and return paginated ideas matching userId
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

    //   // // Find and return paginated ideas matching userId
    //   // const ideas = await prisma.idea.findMany({
    //   //   skip,
    //   //   take,
    //   //   where: { id: payload.userId }
    //   // });

    //   // return ideas;

    //   const ideas = await ctx.prisma.idea.findMany({
    //     skip,
    //     take,
    //     where: { author: { id: payload.userId } }
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
          data: { content, author: { connect: { id: payload.userId } } },
          select: { id: true, content: true, author: { select: { id: true } } }
        });

        // Return new idea
        return ideaRecord;
      } catch (error) {
        console.log('idea createIdea error: ', error);

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
        const ownsIdea = idea.author.id === payload.userId;

        // If not, throw error
        if (!ownsIdea) throw new ForbiddenError('idea.invalidOwnership');

        // Update idea
        const updatedIdea = ctx.prisma.idea.update({
          where: { id },
          data: { content },
          select: { id: true, content: true, author: { select: { id: true } } }
        });

        return updatedIdea;
      } catch (error) {
        console.log('idea updateIdea error: ', error);

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
        if (!ownsIdea) throw new ForbiddenError('idea.invalidOwnership');

        // Update idea soft delete field
        const removedIdea = await prisma.idea.update({
          where: { id },
          data: { deletedAt: new Date().toISOString() },
          select: { id: true }
        });

        // Return removed idea
        return removedIdea;
      } catch (error) {
        console.log('idea removeIdea error: ', error);

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
        const ownsIdea = idea.author.id === payload.userId;

        // If not, throw error
        if (!ownsIdea) throw new ForbiddenError('idea.invalidOwnership');

        // Delete idea
        const deletedIdea = ctx.prisma.idea.delete({
          where: { id },
          select: { id: true }
        });

        // Return deleted idea
        return deletedIdea;
      } catch (error) {
        console.log('idea deleteIdea error: ', error);

        throw error;
      }
    }
  }
};

export default ideaResolver;
