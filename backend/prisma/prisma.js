import pkg from '@prisma/client';

import { development } from '../src/constants/config.js';
// import consoleLog from '../src/utils/consoleLog.js';

// https://www.prisma.io/docs/reference/api-reference/prisma-client-reference
// https://pris.ly/d/help/next-js-best-practices
// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/vercel-caching-issue

const { PrismaClient } = pkg;

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

const prisma =
  global.prisma ||
  new PrismaClient({
    errorFormat: 'pretty',

    log: development
      ? [
          { level: 'query', emit: 'stdout' },
          { level: 'info', emit: 'stdout' },
          { level: 'warn', emit: 'stdout' },
          { level: 'error', emit: 'stdout' }
        ]
      : []
  });

// prisma.$on('query', e => consoleLog('e:', e));

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
