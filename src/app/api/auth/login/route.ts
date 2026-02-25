import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.isVerified)
    return NextResponse.json({ error: "Verify email first" }, { status: 403 });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  const cookie = serialize("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return new NextResponse(JSON.stringify({ message: "Login successful" }), {
    status: 200,
    headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
  });
}
