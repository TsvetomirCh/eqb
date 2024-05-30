import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const users = await Promise.all(
      Array.from({ length: 10 }).map(() =>
        prisma.user.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
          },
        }),
      ),
    );

    await Promise.all(
      Array.from({ length: 20 }).map(() =>
        prisma.post.create({
          data: {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(2),
            published: faker.datatype.boolean({ probability: 0.5 }),
            authorId: users[Math.floor(Math.random() * users.length)].id,
          },
        }),
      ),
    );

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
