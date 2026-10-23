import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { parseSpareDetails } from "@/lib/spare-parts-options";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";
    const q = (searchParams.get("q") || "").trim();
    const location = (searchParams.get("location") || "").trim();
    const sellerId = searchParams.get("sellerId") || "";
    const status = searchParams.get("status") || "ACTIVE";

    const where: any = {};
    if (status !== "ALL") {
      where.status = status;
    }
    if (category) {
      where.categoryId = category;
    }
    if (sellerId) {
      where.sellerId = sellerId;
    }
    if (location) {
      where.location = { contains: location };
    }
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { description: { contains: q } },
        { location: { contains: q } },
      ];
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        seller: { select: { id: true, name: true, email: true, phone: true, avatarUrl: true } },
        category: { select: { id: true, name: true, slug: true, icon: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      total: listings.length,
      listings,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load listings" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json(
        { error: "Sign in to post an ad" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const location = String(body.location || "").trim();
    const categoryId = String(body.categoryId || "");
    const subcategory = body.subcategory ? String(body.subcategory).trim() : null;
    const price = Number(body.price);
    const isSpares = subcategory === "Spares & Car Care";
    const spareDetails = isSpares ? parseSpareDetails(body.spareDetails) : null;
    if (isSpares && (!spareDetails || !["New", "Used", "Refurbished"].includes(body.condition))) {
      return NextResponse.json({ error: "Please select a valid make, model, part type, subtype, and condition." }, { status: 400 });
    }
    const condition = body.condition === "New" ? "New" : isSpares && body.condition === "Refurbished" ? "Refurbished" : "Used";
    let imageUrls: string[] = [];
    try {
      const parsed = JSON.parse(String(body.imageUrl || "[]"));
      if (Array.isArray(parsed)) imageUrls = parsed.filter((url): url is string => typeof url === "string" && url.trim().length > 0);
    } catch {
      imageUrls = String(body.imageUrl || "").split(",").map((url: string) => url.trim()).filter(Boolean);
    }
    if (imageUrls.length < 3 || imageUrls.length > 10) {
      return NextResponse.json({ error: "Please upload between 3 and 10 images" }, { status: 400 });
    }
    const imageUrl = JSON.stringify(imageUrls);

    if (
      !title ||
      !description ||
      !location ||
      !categoryId ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 },
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return NextResponse.json(
        { error: "Selected category no longer exists. Please pick a new category." },
        { status: 400 },
      );
    }

    if (isSpares && !category.name.toLowerCase().includes("vehic")) {
      return NextResponse.json({ error: "Spares & Car Care belongs to Vehicles & Cars." }, { status: 400 });
    }
    const metadataDetails = body.metadata?.details || null;
    const structuredDetails = spareDetails
      ? JSON.stringify(spareDetails)
      : metadataDetails && Object.keys(metadataDetails).length > 0
        ? JSON.stringify(metadataDetails)
        : null;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        spareDetails: structuredDetails,
        subcategory,
        location,
        categoryId,
        price: Math.round(price),
        condition,
        imageUrl,
        status: "ACTIVE",
        sellerId: user.id,
      },
    });
    return NextResponse.json(listing);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Could not post ad" },
      { status: 500 },
    );
  }
}
