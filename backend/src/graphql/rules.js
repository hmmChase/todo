import { rule, and, or, not } from 'graphql-shield';

export const isAdmin = rule()(async (parent, args, ctx, info) => {
  const userId = args.userId;

  // Is there an Admin with such email in our database (Prisma)?
  const user = await ctx.prisma.grocer({ where: { id: userId } });

  return user && user.role === 'admin';
});

export const isUser = rule()(async (parent, args, ctx, info) => {
  const userId = args.userId;

  // Is there a User with such email in our database (Prisma)?
  const user = await ctx.prisma.user({ where: { id: userId } });

  return user && user.role !== 'admin';
});

export const isAuthenticated = or(isAdmin, isUser);

export const isIdeaOwner = rule()(async (parent, args, ctx, info) => {
  const userId = args.userId;

  const author = await ctx.prisma.idea
    .findUnique({ where: { id: userId } })
    .author();

  return userId === author.id;
});
