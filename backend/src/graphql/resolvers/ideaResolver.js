import { authAccessToken } from '../../utils/accessToken.js';
import { development } from '../../constants/config.js';
import { GraphQLError } from 'graphql';
import consoleLog from '../../utils/consoleLog.js';
import paginate from '../../utils/paginate.js';

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
          // select: {
          //   id: true,
          //   createdAt: true,
          //   content: true,
          //   author: { select: { id: true } }
          // },
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

    /* Return cursor paginated ideas */
    ideasPaginatedCursor: async (parent, args, ctx, info) => {
      const { after, pageSize } = args;

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

        const ideasPaginated = paginate({ after, pageSize, results: ideas });

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

        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        const hasMore = ideasPaginated.length
          ? ideasPaginated[ideasPaginated.length - 1].createdAt !==
            ideas[ideas.length - 1].createdAt
          : false;

        return { cursor, hasMore, ideas: ideasPaginated };
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return authenticated user's ideas */
    currentUserIdeas: async (parent, args, ctx, info) => {
      // If user not logged in, return null
      if (!ctx.accessToken) throw new GraphQLError(401);

      // Verify access token & decode payload
      const payload = authAccessToken(ctx.accessToken);

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
    //   const payload = authAccessToken(ctx.accessToken);

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
    //   const payload = authAccessToken(ctx.accessToken);

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

      // If user not logged in, return null
      if (!ctx.accessToken) throw new GraphQLError(401);

      // Verify access token and decode payload
      const payload = authAccessToken(ctx.accessToken);

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

      // If user not logged in, return null
      if (!ctx.accessToken) throw new GraphQLError(401);

      // Verify access token and decode payload
      const payload = authAccessToken(ctx.accessToken);

      try {
        // Request idea's author ID
        const idea = await ctx.prisma.idea.findUnique({
          where: { id },
          select: { author: { select: { id: true } } }
        });

        // Check if they own that idea
        const ownsIdea = idea.author.id === payload.id;

        // If not, throw error
        if (!ownsIdea) throw new GraphQLError(403);

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

      // If user not logged in, return null
      if (!ctx.accessToken) throw new GraphQLError(401);

      // Verify access token and decode payload
      const payload = authAccessToken(ctx.accessToken);

      try {
        // Request idea's author ID
        const idea = await ctx.prisma.idea.findUnique({
          where: { id },
          select: { author: { select: { id: true } } }
        });

        // Check if they own that idea
        const ownsIdea = idea.author.id === payload.id;

        // If not, throw error
        if (!ownsIdea) throw new GraphQLError(403);

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

      // If user not logged in, return null
      if (!ctx.accessToken) throw new GraphQLError(401);

      // Verify access token and decode payload
      const payload = authAccessToken(ctx.accessToken);

      try {
        // Request idea's author ID
        const idea = await ctx.prisma.idea.findUnique({
          where: { id },
          select: { author: { select: { id: true } } }
        });

        // Check if they own that idea
        const ownsIdea = idea.author.id === payload.id;

        // If not, throw error
        if (!ownsIdea) throw new GraphQLError(403);

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
  },

  Idea: {
    // Return idea author
    author(parent, args, ctx, info) {
      return ctx.prisma.idea
        .findUnique({ where: { id: parent.id } })
        .author({ select: { id: true } });

      // return ctx.prisma.user.findUnique({
      //   where: { id: parent.authorId },
      //   select: { id: true }
      // });
    }
  }
};

export default ideaResolver;
