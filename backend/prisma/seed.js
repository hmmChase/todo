// 'npm run seed' to seed

import { faker } from '@faker-js/faker';
import bcryptjs from 'bcryptjs';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const createTasks = amtTasks => {
  const tasks = [];

  for (let i = 0; i < amtTasks; i++)
    tasks.push({ content: faker.lorem.sentence() });

  return tasks;
};

const userData = async () => {
  const amtUsers = 10;

  const users = [
    {
      email: 'admin@email.com',
      password: await bcryptjs.hash('admin123$', 10),
      role: 'ADMIN'
    },
    {
      email: 'user@email.com',
      password: await bcryptjs.hash('user123$', 10),
      role: 'USER',
      tasks: { create: createTasks(3) }
    }
  ];

  for (let i = 0; i < amtUsers; i++) {
    users.push({
      email: faker.internet.email(),
      password: await bcryptjs.hash(faker.internet.password(), 10),
      role: 'USER',
      tasks: { create: createTasks(3) }
    });
  }

  return users;
};

const main = async () => {
  console.log(`Start seeding ...`);

  for (const user of await userData()) {
    const userRecord = await prisma.user.create({ data: user });

    console.log(`Created user with id: ${userRecord.id}`);
  }
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
