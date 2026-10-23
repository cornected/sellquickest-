import { NextRequest, NextResponse } from "next/server";
import { getSession, verifySessionToken, SessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    let sessionUser: SessionUser | null = await getSession();

    // Also support token in Authorization header or ?token=
    if (!sessionUser) {
      const authHeader = request.headers.get("authorization") || request.headers.get("x-session-token");
      const urlToken = request.nextUrl.searchParams.get("token");
      const candidate = authHeader?.replace(/^Bearer\s+/i, "") || urlToken;
      if (candidate) {
        sessionUser = verifySessionToken(candidate);
      }
    }

    if (!sessionUser?.id) {
      return NextResponse.json({ ok: false, user: null });
    }

    // Optionally retrieve latest DB user info
    let dbUser: any = null;
    try {
      dbUser = await prisma.user.findUnique({
        where: { id: sessionUser.id },
        select: { id: true, name: true, email: true, phone: true, avatarUrl: true, isVerified: true },
      });
    } catch {}

    const finalUser = dbUser
      ? { ...sessionUser, ...dbUser }
      : sessionUser;

    return NextResponse.json({
      ok: true,
      user: finalUser,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, user: null, error: err?.message }, { status: 500 });
  }
}
