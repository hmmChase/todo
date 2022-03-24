// https://pris.ly/d/help/next-js-best-practices
import pkg from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

const { PrismaClient } = pkg;

const prisma = global.prisma || new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
