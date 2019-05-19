import * as auth from '../utils/auth';

export default {
  Query: {
    idea: async (parent, args, ctx, info) => {
      return ctx.prisma.query.idea({ where: { id: args.id } }, info);
    },

    ideas: async (parent, args, ctx, info) => {
      return ctx.prisma.query.ideas();
    },

    getUserIdeas: async (parent, args, ctx, info) => {
      await auth.isAuthenticated(ctx.me);

      return ctx.prisma.query.ideas({
        where: { author: { id: ctx.me.user.id } }
      });
    }
  },

  Mutation: {
    createIdea: async (parent, args, ctx, info) => {
      await auth.isAuthenticated(ctx.me);

      return ctx.prisma.mutation.createIdea({
        data: {
          author: { connect: { id: ctx.me.user.id } },
          content: args.content
        }
      });
    },

    updateIdea: async (parent, args, ctx, info) => {
      await auth.isAuthenticated(ctx.me);

      return ctx.prisma.mutation.updateIdea({
        where: { id: args.id },
        data: { content: args.content }
      });
    },

    deleteIdea: async (parent, args, ctx, info) => {
      await auth.isAuthenticated(ctx.me);

      return ctx.prisma.mutation.deleteIdea({
        where: { id: args.id }
      });
    }
  },

  // Further resolvers to resolve the connections on a per-field level
  // The root (parent) resolver that ran, passes its data to any per-field resolvers

  Idea: {
    author: (parent, args, ctx, info) => {
      console.log('idea parent: ', parent);

      // return ctx.prisma.query.idea({ where: { id: parent.id } }).author();

      return ctx.prisma.query.user({ where: { id: parent.author.id } });
    }
  }
};
