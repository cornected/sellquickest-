import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { parseSpareDetails } from "@/lib/spare-parts-options";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // A comprehensive list of 17 standard categories for a premium marketplace
    const sampleCategories = [
      { name: "Agriculture & Food", slug: "agriculture-food", icon: "🌾" },
      {
        name: "Beauty & Personal Care",
        slug: "beauty-personal-care",
        icon: "💄",
      },
      { name: "Electronics", slug: "electronics", icon: "📺" },
      { name: "Fashion", slug: "fashion", icon: "👗" },
      {
        name: "Home, Furniture & Appliances",
        slug: "home-furniture",
        icon: "🛋️",
      },
      { name: "Jobs", slug: "jobs", icon: "💼" },
      { name: "Pets", slug: "pets", icon: "🐕" },
      { name: "Phones & Tablets", slug: "phones-tablets", icon: "📱" },
      { name: "Property & Real Estate", slug: "property", icon: "🏠" },
      { name: "Services", slug: "services", icon: "🔧" },
      { name: "Sports, Arts & Outdoors", slug: "sports-outdoors", icon: "⚽" },
      { name: "Vehicles & Cars", slug: "vehicles", icon: "🚗" },

      // EXTRA CATEGORIES TO FORCE THE 3RD ROW LAYER AND SHOW THE BUTTON
      {
        name: "Commercial Equipment",
        slug: "commercial-equipment",
        icon: "🏗️",
      },
      {
        name: "Repair & Construction",
        slug: "repair-construction",
        icon: "🔨",
      },
      { name: "Babies & Kids Items", slug: "babies-kids", icon: "🍼" },
      { name: "Books, Games & Movies", slug: "media-books", icon: "📚" },
      { name: "Health & Wellness", slug: "health", icon: "💊" },
    ];

    // Clear your existing entries and reseed fresh records
    await prisma.category.deleteMany({});

    for (const cat of sampleCategories) {
      await prisma.category.create({
        data: cat,
      });
    }

    return NextResponse.json({
      success: true,
      message: "17 categories seeded successfully!",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
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
    const price = Number(body.price);
    const isSpares = body.subcategory === "Spares & Car Care";
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
        location,
        categoryId,
        price: Math.round(price),
        condition,
        imageUrl,
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
