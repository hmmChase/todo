const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// 'npm run seed' to seed
//? npx prisma db seed --schema=./src/prisma/schema.prisma --preview-feature

const prisma = new PrismaClient();

const ideas = () => {
  const amtIdeas = 10;
  const ideas = [];

  for (let i = 1; i < amtIdeas; i++)
    ideas.push({ content: 'seeded idea ' + i });

  return ideas;
};

const main = async () => {
  console.log('Start seeding...');

  const user = await prisma.user.create({
    data: {
      email: 'user@email.com',
      password: await bcrypt.hash('user123$', 10),
      role: 'USER',
      ideas: { create: ideas() }
    }
  });

  console.log('Created user: ', user);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@email.com',
      password: await bcrypt.hash('admin123$', 10),
      role: 'ADMIN'
    }
  });

  console.log('Created admin: ', admin);
};

main()
  .catch(error => {
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding finished.');

    await prisma.$disconnect();
  });

// const userData = [
//   {
//     email: 'admin@email.com',
//     password: async () => await bcrypt.hash('admin123$', 10),
//     role: 'ADMIN'
//   },
//   {
//     email: 'user@email.com',
//     password: async () => await bcrypt.hash('user123$', 10),
//     role: 'USER',
//     ideas: { create: ideas() }
//   }
// ];

// const main = async () => {
//   console.log('Start seeding...');

//   try {
//     for (const user of userData) {
//       const createdUser = await prisma.user.create({ data: user });

//       console.log('Created user: ', createdUser);
//     }

//     console.log('Seeding finished.');
//   } catch (error) {
//     console.error(error);

//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// };
