import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const cleanEmail = String(email).toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (!user || !(await bcrypt.compare(String(password), user.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const sessionData = { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl };
    const token = await setSession(sessionData);
    const response = NextResponse.json({ ok: true, user: sessionData, token });
    response.cookies.set("classi_session", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
    response.cookies.set("classi_session_client", token, {
      httpOnly: false,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Sign in failed" }, { status: 500 });
  }
}
