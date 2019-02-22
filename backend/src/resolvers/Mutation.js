const Mutation = {
  createUser: (parent, args, ctx, info) => {
    return ctx.prisma.createUser({ ...args }, info);
  }
};

module.exports = Mutation;
