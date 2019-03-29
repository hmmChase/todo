module.exports.Query = {
  async users(parent, args, ctx, info) {
    return ctx.prisma.query.users();
  }
};

module.exports.Mutation = {
  async signup(parent, args, ctx, info) {
    const user = await ctx.prisma.mutation.createUser({
      data: { ...args }
    });
    return user;
  }
};
