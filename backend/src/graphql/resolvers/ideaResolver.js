import { AuthenticationError, ForbiddenError } from '../../utils/error.js';
import { consoleLog } from '../../utils/myLogger.js';
import { development } from '../../constants/config.js';
import { verifyAccessToken } from '../../utils/accessToken.js';
import paginateResults from '../../utils/paginateResults.js';

const ideaResolver = {
  Query: {
    /* Return idea matching ID */
    idea: async (parent, args, ctx, info) => {
      const { id } = args;

      try {
        // Find idea matching user id
        const idea = await ctx.prisma.idea.findUnique({
          where: { id },
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: { select: { id: true } }
          }
        });

        // Return idea
        return idea;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return all ideas */
    ideas: async (parent, args, ctx, info) => {
      try {
        // Find all ideas that haven't been deleted
        const ideas = await ctx.prisma.idea.findMany({
          where: { removedAt: null },
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: { select: { id: true } }
          },
          orderBy: { createdAt: 'desc' }
        });

        // Return ideas
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
        throw ForbiddenError(
          'idea.error.ideasPaginatedOffset.invalidOffsetOrLimit'
        );

      try {
        const ideas = await ctx.prisma.idea.findMany({
          skip: offset,
          take: limit, // first
          where: { removedAt: null },
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: { select: { id: true } }
          },
          orderBy: { createdAt: 'desc' }
        });

        return ideas;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    //todo: figure out what to use as a cursor

    /* Return cursor paginated ideas */
    ideasPaginatedCursor: async (parent, args, ctx, info) => {
      const { after, pageSize } = args;

      // if (!cursor || !limit)
      //   throw ForbiddenError(
      //     'idea.error.ideasPaginatedCursor.invalidCursorOrLimit'
      //   );

      console.log('after:', after);
      console.log('pageSize:', pageSize);

      // if ((!offset && offset !== 0) || !limit)
      //   throw ForbiddenError(
      //     'idea.error.ideasPaginatedCursor.invalidOffsetOrLimit'
      //   );

      try {
        const ideas = await ctx.prisma.idea.findMany({
          // cursor: { createdAt: after },
          // take: pageSize,
          where: { removedAt: null },
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: { select: { id: true } }
          },
          orderBy: { createdAt: 'desc' }
        });

        // console.log('ideas:', ideas);

        const ideasPaginated = paginateResults({
          after,
          pageSize,
          results: ideas
        });

        console.log('ideasPaginated:', ideasPaginated);

        // try {
        //   const ideas = await ctx.prisma.idea.findMany({
        //     skip: 1, // Skip the cursor
        //     take: limit, // first
        //     cursor: { id: cursor },
        //     where: { removedAt: null },
        //     select: { id: true, content: true, author: { select: { id: true } } },
        //     orderBy: { createdAt: 'desc' }
        //   });

        // Bookmark your location in the result set - in this
        // case, the ID of the last post in the list of 4.
        // const lastPostInResults = ideas[3]; // Remember: zero-based index! :)
        // const myCursor = lastPostInResults.id; // Example: 29

        // if there are launches, get the cursor of the last launch, else null
        const cursor = ideasPaginated.length
          ? ideasPaginated[ideasPaginated.length - 1].createdAt
          : null;

        console.log('cursor:', cursor);

        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        const hasMore = ideasPaginated.length
          ? ideasPaginated[ideasPaginated.length - 1].createdAt !==
            ideas[ideas.length - 1].createdAt
          : false;

        console.log('hasMore:', hasMore);

        return { cursor, hasMore, ideas: ideasPaginated };
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return authenticated user's ideas */
    currentUserIdeas: async (parent, args, ctx, info) => {
      // If user not logged in, return null
      if (!ctx.accessToken) throw AuthenticationError('no access token');
      // if (!ctx.accessToken) return null;

      // Verify access token & decode payload
      const payload = verifyAccessToken(ctx.accessToken);

      try {
        // Find all ideas matching author id & haven't been deleted
        const ideas = await ctx.prisma.idea.findMany({
          where: { author: { id: payload.id }, removedAt: null },
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: { select: { id: true } }
          },
          orderBy: { createdAt: 'desc' }
        });

        // Return current user ideas
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

    // currentUserCursorPaginatedIdeas: async (parent, args, ctx, info) => {
    //   const { skip, take } = args;

    //   // Verify access token and decode payload
    //   const payload = verifyAccessToken(ctx.accessToken);

    //   // // Find and return paginated ideas matching user id
    //   // const ideas = await prisma.idea.findMany({
    //   //   skip,
    //   //   take,
    //   //   where: { id: payload.id }
    //   // });

    //   // return ideas;

    //   const ideas = await ctx.prisma.idea.findMany({
    //     skip,
    //     take,
    //     where: { author: { id: payload.id } }
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
        const idea = ctx.prisma.idea.create({
          data: { content, author: { connect: { id: payload.id } } },
          select: {
            createdAt: true,
            id: true,
            content: true,
            author: { select: { id: true } }
          }
        });

        // Return new idea
        return idea;
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
        const ownsIdea = idea.author.id === payload.id;

        // If not, throw error
        if (!ownsIdea)
          throw ForbiddenError('idea.error.updateIdea.invalidOwnership');

        // Update idea
        const updatedIdea = ctx.prisma.idea.update({
          where: { id },
          data: { content },
          select: { id: true, content: true, author: { select: { id: true } } }
        });

        // Return updated idea
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
        const ownsIdea = idea.author.id === payload.id;

        // If not, throw error
        if (!ownsIdea)
          throw ForbiddenError('idea.error.removeIdea.invalidOwnership');

        // Update idea soft delete field
        const removedIdea = await ctx.prisma.idea.update({
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
        const ownsIdea = idea.author.id === payload.id;

        // If not, throw error
        if (!ownsIdea)
          throw ForbiddenError('idea.error.deleteIdea.invalidOwnership');

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
