import { prisma } from "../lib/prisma";

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();

  await new Promise((resolve) => setTimeout(resolve, 500));
});
