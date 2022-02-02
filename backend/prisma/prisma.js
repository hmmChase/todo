// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prisma = global.prisma || new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
