const { PrismaClient } = require('@prisma/client');

// 'npm run seed' to seed

const prisma = new PrismaClient();

const main = async () => {
  console.log(`Start seeding ...`);

  const createdName = await prisma.name.create({ data: { name: 'hmmStart' } });

  console.log('Created name: ', createdName);

  console.log(`Seeding finished.`);
};

main()
  .catch(e => {
    console.error(e);

    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding complete.');

    await prisma.$disconnect();
  });
