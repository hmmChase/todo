export default {
  Query: {
    // Return idea matching ID
    idea: (parent, args, ctx, info) => {
      return ctx.prisma.idea.findOne({ where: { id: args.id } });
    },

    // Return all ideas
    ideas: (parent, args, ctx, info) => {
      return ctx.prisma.idea.findMany();
    }
  }

  // Mutation: {}
};
