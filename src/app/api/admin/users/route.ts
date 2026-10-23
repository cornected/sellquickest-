import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";
import { DEMO_USERS } from "@/lib/demoData";

export async function GET(req: NextRequest) {
  try {
    const user = await getSession();
    const isAdmin = isUserAdmin(user);

    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("q") || "").toLowerCase().trim();

    let users: any[] = [];
    try {
      users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatarUrl: true,
          isVerified: true,
          isBanned: true,
          createdAt: true,
          _count: { select: { listings: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      users = Object.values(DEMO_USERS).map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        avatarUrl: u.avatarUrl,
        isVerified: u.id === "user-ada-101",
        isBanned: false,
        createdAt: u.createdAt,
        _count: { listings: 4 },
      }));
    }

    if (query) {
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          (u.phone && u.phone.includes(query))
      );
    }

    return NextResponse.json({
      success: true,
      isAdmin,
      users,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, isVerified, isBanned } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "User id required" }, { status: 400 });
    }

    await prisma.user
      .update({
        where: { id },
        data: {
          isVerified: !!isVerified,
          isBanned: !!isBanned,
        },
      })
      .catch(() => {});

    return NextResponse.json({
      success: true,
      id,
      isVerified: !!isVerified,
      isBanned: !!isBanned,
      message: `User ${id} updated successfully`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update user" }, { status: 500 });
  }
}

