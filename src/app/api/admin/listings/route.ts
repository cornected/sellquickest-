import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";
import { DEMO_LISTINGS } from "@/lib/demoData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getSession();
    const isAdmin = isUserAdmin(user);

    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("q") || "").toLowerCase().trim();
    const status = searchParams.get("status") || "ALL";
    const category = searchParams.get("category") || "ALL";

    let listings: any[] = [];
    try {
      listings = await prisma.listing.findMany({
        include: {
          seller: { select: { id: true, name: true, email: true, phone: true, avatarUrl: true } },
          category: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      listings = DEMO_LISTINGS.map((l) => ({
        ...l,
        seller: { id: l.sellerId, name: l.seller?.name || "Seller", email: "seller@sellquickest.ng" },
        category: { id: l.categoryId, name: l.category?.name || "General", slug: l.category?.slug || "general" },
      }));
    }

    let filtered = listings;
    if (status !== "ALL") {
      filtered = filtered.filter((l) => l.status === status);
    }
    if (category !== "ALL") {
      filtered = filtered.filter(
        (l) => l.categoryId === category || l.category?.slug === category || l.category?.name === category
      );
    }
    if (query) {
      filtered = filtered.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          l.description.toLowerCase().includes(query) ||
          l.location.toLowerCase().includes(query) ||
          l.seller?.name?.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      isAdmin,
      total: filtered.length,
      listings: filtered,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to fetch listings" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getSession();
    const isAdmin = isUserAdmin(user);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 403 });
    }

    const { id, status, boostTier } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Listing id required" }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (boostTier !== undefined) {
      updateData.boostTier = boostTier;
      updateData.boostExpiresAt = boostTier ? new Date(Date.now() + 7 * 86400000) : null;
    }

    try {
      const updated = await prisma.listing.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json({ success: true, listing: updated });
    } catch {
      // In-memory or demo fallback
      return NextResponse.json({ success: true, updatedId: id, ...updateData });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update listing" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getSession();
    const isAdmin = isUserAdmin(user);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Listing id required" }, { status: 400 });
    }

    try {
      await prisma.listing.delete({
        where: { id },
      });
    } catch {}

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to delete listing" }, { status: 500 });
  }
}
