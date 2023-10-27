import { authAccessToken } from '../../utils/accessToken.js';
import { development } from '../../constants/config.js';
import { GraphQLError } from 'graphql';
import consoleLog from '../../utils/consoleLog.js';
import paginate from '../../utils/paginate.js';

import { corsOptions } from '../../constants/cors.js';

const taskResolver = {
  Query: {
    /* Return task matching ID */
    task: async (parent, args, ctx, info) => {
      const { id } = args;

      try {
        // Find task matching user id
        const task = await ctx.prisma.task.findUnique({
          where: { id },
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: { select: { id: true } }
          }
        });

        // Return task
        return task;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return all tasks */
    tasks: async (parent, args, ctx, info) => {
      try {
        // Find all tasks that haven't been deleted
        const tasks = await ctx.prisma.task.findMany({
          where: { removedAt: null },
          // select: {
          //   id: true,
          //   createdAt: true,
          //   content: true,
          //   author: { select: { id: true } }
          // },
          orderBy: { createdAt: 'desc' }
        });

        // Return tasks
        return tasks;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return offset paginated tasks */
    tasksPaginatedOffset: async (parent, args, ctx, info) => {
      const { offset, limit } = args;

      try {
        const tasks = await ctx.prisma.task.findMany({
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

        return tasks;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return cursor paginated tasks */
    tasksPaginatedCursor: async (parent, args, ctx, info) => {
      const { after, pageSize } = args;

      try {
        const tasks = await ctx.prisma.task.findMany({
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

        const tasksPaginated = paginate({ after, pageSize, results: tasks });

        // try {
        //   const tasks = await ctx.prisma.task.findMany({
        //     skip: 1, // Skip the cursor
        //     take: limit, // first
        //     cursor: { id: cursor },
        //     where: { removedAt: null },
        //     select: { id: true, content: true, author: { select: { id: true } } },
        //     orderBy: { createdAt: 'desc' }
        //   });

        // Bookmark your location in the result set - in this
        // case, the ID of the last post in the list of 4.
        // const lastPostInResults = tasks[3]; // Remember: zero-based index! :)
        // const myCursor = lastPostInResults.id; // Example: 29

        // if there are launches, get the cursor of the last launch, else null
        const cursor = tasksPaginated.length
          ? tasksPaginated[tasksPaginated.length - 1].createdAt
          : null;

        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        const hasMore = tasksPaginated.length
          ? tasksPaginated[tasksPaginated.length - 1].createdAt !==
            tasks[tasks.length - 1].createdAt
          : false;

        return { cursor, hasMore, tasks: tasksPaginated };
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    /* Return authenticated user's tasks */
    currentUserTasks: async (parent, args, ctx, info) => {
      // If user not logged in, return null
      if (!ctx.accessToken) throw new GraphQLError(401);

      // Verify access token & decode payload
      const payload = authAccessToken(ctx.accessToken);

      try {
        // Find all tasks matching author id & haven't been deleted
        const tasks = await ctx.prisma.task.findMany({
          where: { author: { id: payload.id }, removedAt: null },
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: { select: { id: true } }
          },
          orderBy: { createdAt: 'desc' }
        });

        // Return current user tasks
        return tasks;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    }

    // currentUserOffsetPaginatedTasks: async (parent, args, ctx, info) => {
    //   const { skip, take } = args;

    //   // Verify access token and decode payload
    //   const payload = authAccessToken(ctx.accessToken);

    //   // Find and return paginated tasks matching user id
    //   const tasks = await prisma.task.findMany({
    //     skip,
    //     take,
    //     where: { id: payload.userId }
    //   });

    //   return tasks;
    // },

    // currentUserCursorPaginatedTasks: async (parent, args, ctx, info) => {
    //   const { skip, take } = args;

    //   // Verify access token and decode payload
    //   const payload = authAccessToken(ctx.accessToken);

    //   // // Find and return paginated tasks matching user id
    //   // const tasks = await prisma.task.findMany({
    //   //   skip,
    //   //   take,
    //   //   where: { id: payload.id }
    //   // });

    //   // return tasks;

    //   const tasks = await ctx.prisma.task.findMany({
    //     skip,
    //     take,
    //     where: { author: { id: payload.id } }
    //   });

    //   return {
    //     edges: tasks.map(task => {
    //       return { node: task };
    //     }),

    //     aggregate: { count: await ctx.prisma.user.count({ where: args.where }) }
    //   };
    // }
  },

  Mutation: {
    createTask: (parent, args, ctx, info) => {
      const { content } = args;

      // If user not logged in, return null
      if (!ctx.accessToken) throw new GraphQLError(401);

      // Verify access token and decode payload
      const payload = authAccessToken(ctx.accessToken);

      try {
        // Create task
        const task = ctx.prisma.task.create({
          data: { content, author: { connect: { id: payload.id } } },
          select: {
            createdAt: true,
            id: true,
            content: true,
            author: { select: { id: true } }
          }
        });

        // Return new task
        return task;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    updateTask: async (parent, args, ctx, info) => {
      const { id, content } = args;

      // If user not logged in, return null
      if (!ctx.accessToken) throw new GraphQLError(401);

      // Verify access token and decode payload
      const payload = authAccessToken(ctx.accessToken);

      try {
        // Request task's author ID
        const task = await ctx.prisma.task.findUnique({
          where: { id },
          select: { author: { select: { id: true } } }
        });

        // Check if they own that task
        const ownsTask = task.author.id === payload.id;

        // If not, throw error
        if (!ownsTask) throw new GraphQLError(403);

        // Update task
        const updatedTask = ctx.prisma.task.update({
          where: { id },
          data: { content },
          select: { id: true, content: true, author: { select: { id: true } } }
        });

        // Return updated task
        return updatedTask;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    removeTask: async (parent, args, ctx, info) => {
      const { id } = args;

      // If user not logged in, return null
      if (!ctx.accessToken) throw new GraphQLError(401);

      // Verify access token and decode payload
      const payload = authAccessToken(ctx.accessToken);

      try {
        // Request task's author ID
        const task = await ctx.prisma.task.findUnique({
          where: { id },
          select: { author: { select: { id: true } } }
        });

        // Check if they own that task
        const ownsTask = task.author.id === payload.id;

        // If not, throw error
        if (!ownsTask) throw new GraphQLError(403);

        // Update task soft delete field
        const removedTask = await ctx.prisma.task.update({
          where: { id },
          data: { removedAt: new Date().toISOString() },
          select: { id: true }
        });

        // Return removed task
        return removedTask;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    },

    deleteTask: async (parent, args, ctx, info) => {
      const { id } = args;

      // If user not logged in, return null
      if (!ctx.accessToken) throw new GraphQLError(401);

      // Verify access token and decode payload
      const payload = authAccessToken(ctx.accessToken);

      try {
        // Request task's author ID
        const task = await ctx.prisma.task.findUnique({
          where: { id },
          select: { author: { select: { id: true } } }
        });

        // Check if they own that task
        const ownsTask = task.author.id === payload.id;

        // If not, throw error
        if (!ownsTask) throw new GraphQLError(403);

        // Delete task
        const deletedTask = ctx.prisma.task.delete({
          where: { id },
          select: { id: true }
        });

        // Return deleted task
        return deletedTask;
      } catch (error) {
        development && consoleLog(error);

        throw error;
      }
    }
  },

  Task: {
    // Return task author
    author(parent, args, ctx, info) {
      return ctx.prisma.task
        .findUnique({ where: { id: parent.id } })
        .author({ select: { id: true } });

      // return ctx.prisma.user.findUnique({
      //   where: { id: parent.authorId },
      //   select: { id: true }
      // });
    }
  }
};

export default taskResolver;
