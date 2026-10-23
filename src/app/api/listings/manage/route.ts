import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

function isUserAdmin(email?: string | null): boolean {
  if (!email) return false;
  const e = email.toLowerCase().trim();
  return (
    e === "corneliusokabichi@gmail.com" ||
    e.startsWith("admin@") ||
    e.includes("admin") ||
    e === "ada@classi.local"
  );
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, boostTier, boostExpiresAt } = body;
    if (!id || (!status && boostTier === undefined)) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    const hasPermission = listing && (listing.sellerId === user.id || isUserAdmin(user.email));
    if (!listing || !hasPermission) {
      return NextResponse.json({ error: "Not authorized to edit this listing" }, { status: 403 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (boostTier !== undefined) updateData.boostTier = boostTier;
    if (boostExpiresAt !== undefined) {
      updateData.boostExpiresAt = boostExpiresAt ? new Date(boostExpiresAt) : null;
    }

    const updated = await prisma.listing.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, listing: updated });
  } catch (error) {
    console.error("Error updating listing status:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, price, description, location, condition, categoryId, imageUrl, spareDetails } = body;

    if (!id || !title || price === undefined || !location || !condition) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    const hasPermission = listing && (listing.sellerId === user.id || isUserAdmin(user.email));
    if (!listing || !hasPermission) {
      return NextResponse.json({ error: "Not authorized to edit this listing" }, { status: 403 });
    }

    const updated = await prisma.listing.update({
      where: { id },
      data: {
        title: title.trim(),
        price: Math.max(0, parseInt(String(price), 10) || 0),
        description: description?.trim() || "",
        location: location.trim(),
        condition: condition.trim(),
        ...(categoryId ? { categoryId } : {}),
        ...(imageUrl !== undefined ? { imageUrl } : {}),
        ...(spareDetails !== undefined ? { spareDetails } : {}),
      },
    });

    return NextResponse.json({ success: true, listing: updated });
  } catch (error) {
    console.error("Error updating listing content:", error);
    return NextResponse.json({ error: "Server error updating listing" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    const hasPermission = listing && (listing.sellerId === user.id || isUserAdmin(user.email));
    if (!listing || !hasPermission) {
      return NextResponse.json({ error: "Not authorized to delete this listing" }, { status: 403 });
    }

    await prisma.listing.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
