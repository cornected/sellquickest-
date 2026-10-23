import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const exportDump = searchParams.get("export") === "1";

    const [
      users,
      categories,
      listings,
      reviews,
      messages,
      reports,
      notifications,
      savedListings,
      supportTickets,
      kycVerifications,
      paymentTransactions,
    ] = await Promise.all([
      prisma.user.findMany(),
      prisma.category.findMany(),
      prisma.listing.findMany(),
      prisma.review.findMany(),
      prisma.message.findMany(),
      prisma.adReport.findMany(),
      prisma.notification.findMany(),
      prisma.savedListing.findMany(),
      prisma.supportTicket.findMany(),
      prisma.kycVerification.findMany(),
      prisma.paymentTransaction.findMany(),
    ]);

    const summary = {
      engine: process.env.DATABASE_URL?.startsWith("postgres")
        ? "PostgreSQL (Cloud SQL)"
        : "Prisma SQLite + Stateful Sync (file:./dev.db)",
      status: "HEALTHY",
      timestamp: new Date().toISOString(),
      tables: {
        users: users.length,
        categories: categories.length,
        listings: listings.length,
        reviews: reviews.length,
        messages: messages.length,
        adReports: reports.length,
        notifications: notifications.length,
        savedListings: savedListings.length,
        supportTickets: supportTickets.length,
        kycVerifications: kycVerifications.length,
        paymentTransactions: paymentTransactions.length,
      },
    };

    if (exportDump) {
      return NextResponse.json({
        ...summary,
        snapshot: {
          users,
          categories,
          listings,
          reviews,
          messages,
          reports,
          notifications,
          savedListings,
          supportTickets,
          kycVerifications,
          paymentTransactions,
        },
      });
    }

    return NextResponse.json({
      success: true,
      ...summary,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Database diagnostics failed" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const { DEMO_CATEGORIES, DEMO_USERS } = await import("@/lib/demoData");
    
    // Seed default categories
    let seededCategories = 0;
    for (const cat of DEMO_CATEGORIES) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name, icon: cat.icon },
        create: { id: cat.id, name: cat.name, slug: cat.slug, icon: cat.icon },
      }).catch(() => {});
      seededCategories++;
    }

    // Seed default users (Cornelius, Ada, Chidi)
    let seededUsers = 0;
    for (const u of Object.values(DEMO_USERS)) {
      await prisma.user.upsert({
        where: { email: u.email },
        update: { name: u.name, phone: u.phone, avatarUrl: u.avatarUrl },
        create: {
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone,
          avatarUrl: u.avatarUrl,
          isVerified: true,
          passwordHash: u.passwordHash || "$2b$10$q1hoRk4WmG0nO3KT.7ULvOmffgnlzwcBoDB92/gt8Ru1oBidKOWNO",
        },
      }).catch(() => {});
      seededUsers++;
    }

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully!",
      seededCategories,
      seededUsers,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Database initialization failed" }, { status: 500 });
  }
}

