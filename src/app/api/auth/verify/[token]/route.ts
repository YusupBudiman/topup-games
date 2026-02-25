import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const decoded = decodeURIComponent(token);

  const user = await prisma.user.findFirst({
    where: { verifyToken: decoded, verifyTokenExp: { gt: new Date() } },
  });
  if (!user)
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 },
    );

  await prisma.user.update({
    where: { id: user.id },
    data: { isVerified: true, verifyToken: null, verifyTokenExp: null },
  });

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/login?verified=true`,
  );
}
