import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await getSession();
    const notifications = await prisma.notification.findMany({
      where: user?.id ? { userId: user.id } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, notifications });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    const body = await req.json();
    const notif = await prisma.notification.create({
      data: {
        title: String(body.title || "Notification"),
        text: String(body.text || ""),
        type: String(body.type || "info"),
        listingId: body.listingId ? String(body.listingId) : null,
        listingTitle: body.listingTitle ? String(body.listingTitle) : null,
        userId: body.userId || user?.id || "user-ada-101",
      },
    });
    return NextResponse.json({ success: true, notification: notif });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not create notification" },
      { status: 500 }
    );
  }
}

export async function PATCH() {
  try {
    const user = await getSession();
    await prisma.notification.updateMany({
      where: user?.id ? { userId: user.id } : undefined,
      data: { read: true },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not mark notifications read" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const user = await getSession();
    await prisma.notification.deleteMany({
      where: user?.id ? { userId: user.id } : undefined,
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not clear notifications" },
      { status: 500 }
    );
  }
}
