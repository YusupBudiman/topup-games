import { prisma } from "../lib/prisma";

describe("User Database Test", () => {
  let userId: string;

  it("should create a user", async () => {
    const user = await prisma.user.create({
      data: {
        email: `alice${Date.now()}@test.com`,
        username: `alice${Date.now()}`,
        password: "securepassword",
      },
    });

    userId = user.id;

    expect(user).toHaveProperty("id");
  });

  it("should read user by id", async () => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    expect(user).not.toBeNull();
  });

  it("should update user", async () => {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });

    expect(updated.isVerified).toBe(true);
  });

  it("should delete user", async () => {
    const deleted = await prisma.user.delete({
      where: { id: userId },
    });

    expect(deleted.id).toBe(userId);
  });
});
