import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/token";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });
  if (existing)
    return NextResponse.json(
      { message: "Email or username exists" },
      { status: 400 },
    );

  const hashed = await bcrypt.hash(password, 10);
  const token = generateToken();

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashed,
      verifyToken: token,
      verifyTokenExp: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  await sendVerificationEmail(email, username, token);

  return NextResponse.json({
    message: "Check your email to verify your account",
  });
}
