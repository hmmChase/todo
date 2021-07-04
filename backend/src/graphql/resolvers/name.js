export const resolvers = {
  Query: {
    name: async (parent, args, ctx, info) => {
      const name = await ctx.prisma.name.findMany();

      return { id: name[0].id, name: name[0].name };
    }
  }
};
