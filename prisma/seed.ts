import { prisma } from "../lib/prisma";
import { seedUsers } from "./seeds/user.seed";

async function main() {
  console.log("🚀 Start seeding...");

  await seedUsers();

  console.log("🎉 Seeding finished");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
