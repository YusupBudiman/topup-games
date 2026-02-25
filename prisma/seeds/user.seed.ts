import { prisma } from "../../lib/prisma";

export async function seedUsers() {
  console.log("🌱 Seeding users...");

  await prisma.user.createMany({
    data: [
      {
        email: "admin@test.com",
        username: "admin",
        password: "hashedpassword",
        isVerified: true,
      },
      {
        email: "user@test.com",
        username: "user",
        password: "hashedpassword",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Users seeded");
}
