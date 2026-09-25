import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing || listing.sellerId !== user.id) {
      return NextResponse.json({ error: "Not authorized to edit this listing" }, { status: 403 });
    }

    const updated = await prisma.listing.update({
      where: { id },
      data: { status },
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

    if (!listing || listing.sellerId !== user.id) {
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

    if (!listing || listing.sellerId !== user.id) {
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
