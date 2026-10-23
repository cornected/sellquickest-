import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession, setSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PUT(req: NextRequest) {
  try {
    const sessionUser = await getSession();
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const name = String(body.name || "").trim();
    const phone = body.phone !== undefined ? String(body.phone || "").trim() : undefined;
    const newPassword = body.newPassword ? String(body.newPassword) : "";

    if (!name) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }

    const updateData: any = { name };
    if (phone !== undefined) {
      updateData.phone = phone || null;
    }
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "New password must be at least 6 characters" },
          { status: 400 }
        );
      }
      updateData.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    const updated = await prisma.user.update({
      where: { id: sessionUser.id },
      data: updateData,
    });

    const updatedSession = {
      id: sessionUser.id,
      name: updated.name || name,
      email: updated.email || sessionUser.email,
      avatarUrl: updated.avatarUrl ?? sessionUser.avatarUrl,
      phone: updated.phone ?? phone,
    };

    const token = await setSession(updatedSession);
    const response = NextResponse.json({
      ok: true,
      user: updatedSession,
      token,
      message: "Account settings saved successfully.",
    });

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
    console.error("[Profile Update Error]", err);
    return NextResponse.json(
      { error: err?.message || "Could not update profile settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
