import * as auth from '../utils/auth';

export default {
  Query: {
    idea: (parent, args, ctx, info) => {
      return ctx.prisma.query.idea({ where: { id: args.id } });
    },

    ideas: async (parent, args, ctx, info) => {
      return ctx.prisma.query.ideas();
    }
  },

  Mutation: {
    createIdea: async (parent, args, ctx, info) => {
      await auth.isAuthenticated(ctx.currentUser);

      return ctx.prisma.mutation.createIdea({
        data: {
          author: { connect: { id: ctx.currentUser.user.id } },
          content: args.content
        }
      });
    },

    updateIdea: async (parent, args, ctx, info) => {
      await auth.isAuthenticated(ctx.currentUser);

      return ctx.prisma.mutation.updateIdea({
        where: { id: args.id },
        data: { content: args.content }
      });
    },

    deleteIdea: async (parent, args, ctx, info) => {
      await auth.isAuthenticated(ctx.currentUser);

      return ctx.prisma.mutation.deleteIdea({
        where: { id: args.id }
      });
    }
  }
};
