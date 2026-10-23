import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const newPassword = String(body.newPassword || "");

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "Email address and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with that email address." },
        { status: 404 }
      );
    }

    // If user has a registered phone and entered a phone, verify last 4 digits match
    if (phone && user.phone) {
      const userDigits = user.phone.replace(/\D/g, "").slice(-4);
      const inputDigits = phone.replace(/\D/g, "").slice(-4);
      if (userDigits && inputDigits && userDigits !== inputDigits) {
        return NextResponse.json(
          { error: "The phone number digits do not match the phone registered on this account." },
          { status: 400 }
        );
      }
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    await prisma.notification
      .create({
        data: {
          userId: user.id,
          type: "info",
          title: "🔐 Password Reset Completed",
          text: "Your SellQuickest account password was successfully updated.",
          read: false,
        },
      })
      .catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Your password has been reset! You can now sign in with your new password.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to reset password." },
      { status: 500 }
    );
  }
}
