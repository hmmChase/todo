const Query = {
  user: (parent, args, ctx, info) => {
    return ctx.prisma.user({ where: { id: args.id } }, info);
  },

  users: (parent, args, ctx, info) => {
    return ctx.prisma.users({}, info);
  }
};

module.exports = Query;
