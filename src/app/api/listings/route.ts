import { NextRequest, NextResponse } from "next/server";
import { getSession, verifySessionToken, SessionUser } from "@/lib/auth";
import { parseSpareDetails } from "@/lib/spare-parts-options";
import { prisma } from "@/lib/db";
import { DEMO_CATEGORIES } from "@/lib/demoData";

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
    let user: SessionUser | null = await getSession();

    // Fallback: check Authorization header directly from incoming request
    if (!user) {
      const authHeader = request.headers.get("authorization") || request.headers.get("x-session-token");
      if (authHeader) {
        user = verifySessionToken(authHeader);
      }
    }

    if (!user?.id) {
      return NextResponse.json(
        { error: "You must be signed in to post an ad. Please sign in and try again." },
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

    const rawDetails =
      body.metadata?.details && typeof body.metadata.details === "object"
        ? body.metadata.details
        : body.spareDetails && typeof body.spareDetails === "object"
          ? body.spareDetails
          : null;

    const rawCondition = String(
      body.condition ||
        rawDetails?.customCondition ||
        rawDetails?.condition ||
        "Used"
    ).trim();
    const condition =
      rawCondition && rawCondition.toLowerCase() !== "other"
        ? rawCondition
        : "Used";

    let imageUrls: string[] = [];
    try {
      const parsed = JSON.parse(String(body.imageUrl || "[]"));
      if (Array.isArray(parsed)) {
        imageUrls = parsed.filter((url): url is string => typeof url === "string" && url.trim().length > 0);
      }
    } catch {
      imageUrls = String(body.imageUrl || "")
        .split(",")
        .map((url: string) => url.trim())
        .filter(Boolean);
    }

    // Flexible image requirement: at least 1 image (up to 12)
    if (imageUrls.length < 1 || imageUrls.length > 12) {
      return NextResponse.json({ error: "Please upload at least 1 image for your ad (up to 12 photos)." }, { status: 400 });
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
        { error: "Please fill in all required fields (title, price, category, and location)." },
        { status: 400 },
      );
    }

    // 1. Ensure the Category exists in the database (handles empty PostgreSQL DB on Vercel)
    let category = await prisma.category.findUnique({
      where: { id: categoryId },
    }).catch(() => null);

    if (!category) {
      // If table has 0 categories, auto-seed default categories so foreign keys never fail
      const count = await prisma.category.count().catch(() => 0);
      if (count === 0) {
        for (const c of DEMO_CATEGORIES) {
          await prisma.category.upsert({
            where: { slug: c.slug },
            update: { name: c.name, icon: c.icon },
            create: { id: c.id, name: c.name, slug: c.slug, icon: c.icon },
          }).catch(() => {});
        }
      }

      // Check again after seed
      category = await prisma.category.findUnique({
        where: { id: categoryId },
      }).catch(() => null);

      if (!category) {
        // Match by slug or id from DEMO_CATEGORIES and create in DB
        const match = DEMO_CATEGORIES.find((c) => c.id === categoryId || c.slug === categoryId) || DEMO_CATEGORIES[0];
        category = await prisma.category.upsert({
          where: { slug: match.slug },
          update: {},
          create: { id: match.id, name: match.name, slug: match.slug, icon: match.icon },
        }).catch(() => null);
      }
    }

    const finalCategoryId = category?.id || categoryId;

    if (isSpares && category && !category.name.toLowerCase().includes("vehic")) {
      return NextResponse.json({ error: "Spares & Car Care belongs to Vehicles & Cars." }, { status: 400 });
    }

    const mergedDetails = {
      ...(body.spareDetails && typeof body.spareDetails === "object" ? body.spareDetails : {}),
      ...(body.metadata?.details && typeof body.metadata.details === "object" ? body.metadata.details : {}),
    };
    const structuredDetails =
      Object.keys(mergedDetails).length > 0 ? JSON.stringify(mergedDetails) : null;

    // 2. Ensure Seller User exists in the database (handles fresh PostgreSQL DB foreign key constraint)
    let dbUser = await prisma.user.findUnique({ where: { id: user.id } }).catch(() => null);
    if (!dbUser && user.email) {
      dbUser = await prisma.user.findUnique({ where: { email: user.email.toLowerCase().trim() } }).catch(() => null);
    }
    if (!dbUser) {
      try {
        dbUser = await prisma.user.create({
          data: {
            id: user.id,
            name: user.name || "SellQuickest Member",
            email: user.email ? user.email.toLowerCase().trim() : `user-${Date.now()}@sellquickest.ng`,
            passwordHash: "$2b$10$q1hoRk4WmG0nO3KT.7ULvOmffgnlzwcBoDB92/gt8Ru1oBidKOWNO",
          },
        });
      } catch {
        dbUser = null;
      }
    }

    const finalSellerId = dbUser?.id || user.id;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        spareDetails: structuredDetails,
        subcategory,
        location,
        categoryId: finalCategoryId,
        price: Math.round(price),
        condition,
        imageUrl,
        status: "ACTIVE",
        sellerId: finalSellerId,
      },
    });

    return NextResponse.json(listing);
  } catch (error: any) {
    console.error("[POST Listing Error]", error);
    return NextResponse.json(
      { error: error?.message || "Could not post ad. Please try again." },
      { status: 500 },
    );
  }
}
