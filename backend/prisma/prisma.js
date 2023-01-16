// https://www.prisma.io/docs/reference/api-reference/prisma-client-reference
// https://pris.ly/d/help/next-js-best-practices

import pkg from '@prisma/client';

import { development } from '../src/constants/config.js';

const { PrismaClient } = pkg;

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

const prisma =
  global.prisma ||
  new PrismaClient({
    errorFormat: 'pretty',

    log: development
      ? [
          { level: 'query', emit: 'event' },
          { level: 'info', emit: 'stdout' },
          { level: 'warn', emit: 'stdout' },
          { level: 'error', emit: 'stdout' }
        ]
      : []
  });

prisma.$on('query', e => {
  console.log(
    '--------------------------------------------------',
    '\n',
    'Prisma query: ',
    e.query.split(',')[0].split('.')[1],
    ', params: ',
    e.params,
    '\n',
    '--------------------------------------------------'
  );
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
