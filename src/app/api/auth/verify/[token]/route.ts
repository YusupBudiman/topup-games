import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const decoded = decodeURIComponent(token);

  // Cari user dengan token valid
  const user = await prisma.user.findFirst({
    where: { verifyToken: decoded, verifyTokenExp: { gt: new Date() } },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 },
    );
  }

  // Update status verified
  await prisma.user.update({
    where: { id: user.id },
    data: { isVerified: true, verifyToken: null, verifyTokenExp: null },
  });

  // 🔥 Buat JWT untuk auto login
  const tokenJWT = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  const cookie = serialize("token", tokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  // Redirect user ke dashboard / home dengan cookie login otomatis
  return new NextResponse(null, {
    status: 302,
    headers: {
      "Set-Cookie": cookie,
      Location: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    },
  });
}
