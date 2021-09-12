import { ForbiddenError } from 'apollo-server-express';

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
        console.log('idea.idea error: ', error);
      }
    },

    // Return all ideas
    ideas: async (parent, args, ctx, info) => {
      try {
        const ideas = await ctx.prisma.idea.findMany({
          orderBy: { createdAt: 'desc' },
          include: { author: { select: { id: true } } }
        });

        return ideas;
      } catch (error) {
        console.log('idea.ideas error: ', error);
      }
    },

    // Return offset paginated ideas
    ideasPaginatedOffset: async (parent, args, ctx, info) => {
      const { offset, limit } = args;

      if ((!offset && offset !== 0) || !limit)
        throw new ForbiddenError('Please provide an offset and limit.');

      try {
        const ideas = await ctx.prisma.idea.findMany({
          skip: offset,
          take: limit, // first
          include: { author: { select: { id: true } } }
        });

        return ideas;
      } catch (error) {
        console.log('idea.ideasPaginatedOffset error: ', error);
      }
    },

    // Return curser paginated ideas
    ideasPaginatedCurser: async (parent, args, ctx, info) => {
      const { cursor, limit } = args;

      if (!cursor || !limit)
        throw new ForbiddenError('Please provide a cursor and limit.');

      try {
        const ideas = await ctx.prisma.idea.findMany({
          // skip: 1,

          take: limit,

          cursor: { id: cursor },

          orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],

          include: { author: { select: { id: true } } }
        });

        return ideas;
      } catch (error) {
        console.log('idea.ideasPaginatedCurser error: ', error);
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
        console.log('idea.createIdea error: ', error);

        return new AuthenticationError('idea.createIdeaError');
      }
    },

    updateIdea: async (parent, args, ctx, info) => {
      const { id, content } = req.body;

      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      // Request idea's author ID
      const idea = await ctx.prisma.idea.findUnique({
        where: { id },
        include: { author: { select: { id: true } } }
      });

      // Check if they own that idea
      const ownsIdea = idea.author.id === payload.userId;

      // If not, throw error
      if (!ownsIdea) throw new ForbiddenError("That's not your idea.");

      // If so, update and return idea
      const updatedIdea = ctx.prisma.mutation.updateIdea({
        where: { id },
        data: { content }
      });

      return updatedIdea;
    },

    deleteIdea: async (parent, args, ctx, info) => {
      // Verify access token and decode payload
      const payload = verifyAccessToken(ctx.accessToken);

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
    }
  }
};

export default ideaResolver;
