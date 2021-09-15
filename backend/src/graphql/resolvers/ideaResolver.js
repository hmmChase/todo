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
          include: { author: { select: { id: true } } }
        });

        return idea;
      } catch (error) {
        console.log('idea idea error: ', error);

        throw new AuthenticationError('idea.idea.error');
      }
    },

    // Return all ideas
    ideas: async (parent, args, ctx, info) => {
      try {
        const ideas = await ctx.prisma.idea.findMany({
          where: { deletedAt: null },
          orderBy: { createdAt: 'desc' },
          include: { author: { select: { id: true } } }
        });

        return ideas;
      } catch (error) {
        console.log('idea ideas error: ', error);

        throw new AuthenticationError('idea.ideas.error');
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
          include: { author: { select: { id: true } } }
        });

        return ideas;
      } catch (error) {
        console.log('idea ideasPaginatedOffset error: ', error);

        throw new AuthenticationError('idea.ideasPaginatedOffset.error');
      }
    },

    // Return curser paginated ideas
    ideasPaginatedCurser: async (parent, args, ctx, info) => {
      const { cursor, limit } = args;

      if (!cursor || !limit)
        throw new ForbiddenError(
          'idea.ideasPaginatedOffset.invalidCurserOrLimit'
        );

      try {
        const ideas = await ctx.prisma.idea.findMany({
          take: limit,
          cursor: { id: cursor },
          orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
          include: { author: { select: { id: true } } }
        });

        return ideas;
      } catch (error) {
        console.log('idea ideasPaginatedCurser error: ', error);

        throw new AuthenticationError('idea.ideasPaginatedCurser.error');
      }
    },

    currentUserIdeas: async (parent, args, ctx, info) => {
      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Find and return all ideas matching userId
        const ideas = await ctx.prisma.idea.findMany({
          where: { author: { id: payload.userId }, deletedAt: null },
          orderBy: { createdAt: 'desc' }
        });

        return ideas;
      } catch (error) {
        console.log('idea currentUserIdeas error: ', error);

        throw new AuthenticationError('idea.currentUserIdeas.error');
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
          include: { author: { select: { id: true } } }
        });

        // Return new idea
        return ideaRecord;
      } catch (error) {
        console.log('idea createIdea error: ', error);

        throw new AuthenticationError('idea.createIdea.error');
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
          include: { author: { select: { id: true } } }
        });

        // Check if they own that idea
        const ownsIdea = idea.author.id === payload.userId;

        // If not, throw error
        if (!ownsIdea) throw new ForbiddenError('idea.invalidOwnership');

        // If so, update and return idea
        const updatedIdea = ctx.prisma.idea.update({
          where: { id },
          data: { content }
        });

        return updatedIdea;
      } catch (error) {
        console.log('idea updateIdea error: ', error);

        throw new AuthenticationError('idea.updateIdea.error');
      }
    },

    deleteSoftIdea: async (parent, args, ctx, info) => {
      const { id } = args;

      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Request idea's author ID
        const idea = await ctx.prisma.idea.findUnique({
          where: { id },
          include: { author: { select: { id: true } } }
        });

        // Check if they own that idea
        const ownsIdea = idea.author.id === payload.userId;

        // If not, throw error
        if (!ownsIdea) throw new ForbiddenError('idea.invalidOwnership');

        // Update idea soft delete field
        const updatedIdea = await prisma.idea.update({
          where: { id },
          data: { deletedAt: new Date().toISOString() }
        });

        // Return ID
        return updatedIdea;
      } catch (error) {
        console.log('idea deleteSoftIdea error: ', error);

        throw new AuthenticationError('idea.deleteSoftIdea.error');
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
          include: { author: { select: { id: true } } }
        });

        // Check if they own that idea
        const ownsIdea = idea.author.id === payload.userId;

        // If not, throw error
        if (!ownsIdea) throw new ForbiddenError('idea.invalidOwnership');

        // Delete idea
        const deletedIdea = ctx.prisma.idea.delete({ where: { id } });

        // Return ID
        return deletedIdea;
      } catch (error) {
        console.log('idea deleteIdea error: ', error);

        throw new AuthenticationError('idea.deleteIdea.error');
      }
    }
  }
};

export default ideaResolver;
