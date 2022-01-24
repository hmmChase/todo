const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

// 'npm run seed' to seed
//? npx prisma db seed --schema=./src/prisma/schema.prisma --preview-feature

const prisma = new PrismaClient();

const createIdeas = () => {
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
      password: await bcryptjs.hash('user123$', 10),
      role: 'USER'
      // ideas: { create: ideas() }
    }
  });

  console.log('Created user: ', user);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@email.com',
      password: await bcryptjs.hash('admin123$', 10),
      role: 'ADMIN'
    }
  });

  console.log('Created admin: ', admin);

  // createIdeas().forEach(idea => {
  //   setTimeout(
  //     async () => {
  //       const ideaRecord = await prisma.idea.create({
  //         data: {
  //           content: idea.content,
  //           author: { connect: { id: user.id } }
  //         }
  //       });

  //       console.log('Created idea: ', ideaRecord);
  //     },

  //     10000
  //   );
  // });

  const ideaRecord1 = await prisma.idea.create({
    data: {
      content: 'seeded idea ' + 1,
      author: { connect: { id: user.id } }
    }
  });

  console.log('Created idea: ', ideaRecord1);

  const ideaRecord2 = await prisma.idea.create({
    data: {
      content: 'seeded idea ' + 2,
      author: { connect: { id: user.id } }
    }
  });

  console.log('Created idea: ', ideaRecord2);

  const ideaRecord3 = await prisma.idea.create({
    data: {
      content: 'seeded idea ' + 3,
      author: { connect: { id: user.id } }
    }
  });

  console.log('Created idea: ', ideaRecord3);

  const ideaRecord4 = await prisma.idea.create({
    data: {
      content: 'seeded idea ' + 4,
      author: { connect: { id: user.id } }
    }
  });

  console.log('Created idea: ', ideaRecord4);

  const ideaRecord5 = await prisma.idea.create({
    data: {
      content: 'seeded idea ' + 5,
      author: { connect: { id: user.id } }
    }
  });

  console.log('Created idea: ', ideaRecord5);

  const ideaRecord6 = await prisma.idea.create({
    data: {
      content: 'seeded idea ' + 6,
      author: { connect: { id: user.id } }
    }
  });

  console.log('Created idea: ', ideaRecord6);

  const ideaRecord7 = await prisma.idea.create({
    data: {
      content: 'seeded idea ' + 7,
      author: { connect: { id: user.id } }
    }
  });

  console.log('Created idea: ', ideaRecord7);

  const ideaRecord8 = await prisma.idea.create({
    data: {
      content: 'seeded idea ' + 8,
      author: { connect: { id: user.id } }
    }
  });

  console.log('Created idea: ', ideaRecord8);

  const ideaRecord9 = await prisma.idea.create({
    data: {
      content: 'seeded idea ' + 9,
      author: { connect: { id: user.id } }
    }
  });

  console.log('Created idea: ', ideaRecord9);

  const ideaRecord10 = await prisma.idea.create({
    data: {
      content: 'seeded idea ' + 10,
      author: { connect: { id: user.id } }
    }
  });

  console.log('Created idea: ', ideaRecord10);
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
//     password: async () => await bcryptjs.hash('admin123$', 10),
//     role: 'ADMIN'
//   },
//   {
//     email: 'user@email.com',
//     password: async () => await bcryptjs.hash('user123$', 10),
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
