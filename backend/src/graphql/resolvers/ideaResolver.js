export default {
  Query: {
    // Return idea matching ID
    idea: async (parent, args, ctx, info) => {
      try {
        return await ctx.prisma.idea.findUnique({ where: { id: args.id } });
      } catch (error) {
        console.log('idea.idea error: ', error);
      }
    },

    // Return all ideas
    ideas: async (parent, args, ctx, info) => {
      try {
        return await ctx.prisma.idea.findMany({
          include: { author: { select: { id: true } } }
        });
      } catch (error) {
        console.log('idea.ideas error: ', error);
      }
    }
  }

  // Mutation: {}
};
