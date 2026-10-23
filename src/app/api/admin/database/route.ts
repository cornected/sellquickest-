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
