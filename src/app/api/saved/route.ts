import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await getSession();
    const userId = user?.id || "user-ada-101";

    const savedRecords = await prisma.savedListing.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const ids = savedRecords.map((r: any) => r.listingId);
    const listings =
      ids.length > 0
        ? await prisma.listing.findMany({
            where: { id: { in: ids } },
            orderBy: { createdAt: "desc" },
          })
        : [];

    return NextResponse.json({ success: true, ids, listings });
  } catch (error) {
    console.error("Error fetching saved ads:", error);
    return NextResponse.json(
      { error: "Could not fetch saved ads", ids: [], listings: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    const userId = user?.id || "user-ada-101";
    const body = await req.json();

    // Toggle or set single listingId
    if (body.listingId) {
      const listingId = String(body.listingId);
      const existing = await prisma.savedListing.findMany({
        where: { userId, listingId },
      });

      let saved = false;
      if (body.action === "remove" || (existing.length > 0 && body.action !== "add")) {
        await prisma.savedListing.deleteMany({
          where: { userId, listingId },
        });
        saved = false;
      } else if (existing.length === 0) {
        await prisma.savedListing.create({
          data: { userId, listingId },
        });
        saved = true;
      } else {
        saved = true;
      }

      const allSaved = await prisma.savedListing.findMany({ where: { userId } });
      return NextResponse.json({
        success: true,
        saved,
        ids: allSaved.map((r: any) => r.listingId),
      });
    }

    // Hydrate listings from array of IDs (and sync to DB for user)
    const ids: string[] = Array.isArray(body.ids) ? body.ids : [];
    for (const listingId of ids) {
      const existing = await prisma.savedListing.findMany({
        where: { userId, listingId },
      });
      if (existing.length === 0) {
        await prisma.savedListing
          .create({ data: { userId, listingId } })
          .catch(() => {});
      }
    }

    const allSaved = await prisma.savedListing.findMany({ where: { userId } });
    const mergedIds = Array.from(
      new Set([...ids, ...allSaved.map((r: any) => r.listingId)])
    );

    if (mergedIds.length === 0) {
      return NextResponse.json({ listings: [], ids: [] });
    }

    const listings = await prisma.listing.findMany({
      where: {
        id: { in: mergedIds },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ listings, ids: mergedIds });
  } catch (error) {
    console.error("Error updating/fetching saved ads:", error);
    return NextResponse.json(
      { error: "Could not process saved ads" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const user = await getSession();
    const userId = user?.id || "user-ada-101";

    await prisma.savedListing.deleteMany({
      where: { userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing saved ads:", error);
    return NextResponse.json(
      { error: "Could not clear saved ads" },
      { status: 500 }
    );
  }
}

