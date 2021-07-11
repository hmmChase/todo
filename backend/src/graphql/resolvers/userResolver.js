export default {
  Query: {
    // Return user matching ID
    user: (parent, args, ctx, info) => {
      return ctx.prisma.user.findOne({ where: { id: args.id } });
    },

    // Return all users
    users: (parent, args, ctx, info) => {
      return ctx.prisma.user.findMany();
    }
  }

  // Mutation: {}
};
