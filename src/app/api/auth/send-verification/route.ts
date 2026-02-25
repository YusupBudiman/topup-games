import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (user.isVerified)
    return NextResponse.json({ message: "Already verified" });

  const token = generateToken();
  await prisma.user.update({
    where: { email },
    data: {
      verifyToken: token,
      verifyTokenExp: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  await sendVerificationEmail(email, user.username, token);
  return NextResponse.json({ message: "Verification email sent" });
}
