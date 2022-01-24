const { PrismaClient } = require('@prisma/client');
// const { PrismaClient } = require('./generated/client');

// import { PrismaClient } from './generated/client';
// import pkg, { PrismaClient } from './generated/client';

// Avoid instantiating too many instances of Prisma in development
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

// use `prisma` in your application to read and write data in your DB

let prisma;

const production = process.env.NODE_ENV === 'production';

if (production) prisma = new PrismaClient();
else {
  if (!global.prisma) global.prisma = new PrismaClient();

  prisma = global.prisma;
}

module.exports = prisma;

// if (production) {
//   const { PrismaClientProd } = pkg;

//   prisma = new PrismaClientProd();
// } else {
//   prisma = new PrismaClient();
// }

// export default prisma;

// import { PrismaClient } from '@prisma/client';

// // Avoid instantiating too many instances of Prisma in development
// // https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

// let prisma;

// const production = process.env.NODE_ENV === 'production';

// if (production) prisma = new PrismaClient();
// else {
//   if (!global.prisma) global.prisma = new PrismaClient();

//   prisma = global.prisma;
// }

// export default prisma;
