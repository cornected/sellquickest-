import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ listings: [] });
    }

    const listings = await prisma.listing.findMany({
      where: {
        id: { in: ids },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ listings });
  } catch (error) {
    console.error("Error fetching saved ads:", error);
    return NextResponse.json(
      { error: "Could not fetch saved ads" },
      { status: 500 }
    );
  }
}
