import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, password, phone } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password required" }, { status: 400 });
    }

    const cleanEmail = String(email).toLowerCase().trim();
    let existing: any = null;
    try {
      existing = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
    } catch {
      existing = null;
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);
    let user: any;

    if (existing) {
      user = await prisma.user.update({
        where: { id: existing.id },
        data: {
          name: String(name).trim(),
          phone: phone ? String(phone).trim() : existing.phone || null,
          passwordHash: hashedPassword,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: String(name).trim(),
          email: cleanEmail,
          phone: phone ? String(phone).trim() : null,
          passwordHash: hashedPassword,
        },
      });
    }

    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl || null,
      phone: user.phone || null,
    };
    const token = await setSession(sessionData);
    const response = NextResponse.json({ ok: true, user: sessionData, token });

    // 1. Primary cookie for shared link visitors (Safari, Chrome, Firefox, mobile)
    response.cookies.set("classi_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    // 2. Cross-origin iframe cookie for embedded AI Studio preview
    response.cookies.set("classi_session_iframe", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    // 3. Client accessible cookie for document.cookie verification
    response.cookies.set("classi_session_client", token, {
      httpOnly: false,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    return response;
  } catch (err: any) {
    console.error("[Register Error]", err);
    return NextResponse.json(
      { error: err?.message || "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
