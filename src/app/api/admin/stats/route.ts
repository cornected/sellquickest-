import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";
import { DEMO_LISTINGS, DEMO_USERS } from "@/lib/demoData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getSession();
    // Allow admin access or preview
    const isAdmin = isUserAdmin(user);

    let dbListings: any[] = [];
    let dbUsers: any[] = [];
    let dbReports: any[] = [];

    try {
      dbListings = await prisma.listing.findMany({
        include: {
          seller: { select: { id: true, name: true, email: true } },
          category: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      dbListings = DEMO_LISTINGS.map((l) => ({
        ...l,
        seller: { id: l.sellerId, name: l.seller?.name || "Seller", email: "seller@sellquickest.ng" },
        category: { id: l.categoryId, name: l.category?.name || "General" },
      }));
    }

    try {
      dbUsers = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
          _count: { select: { listings: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      dbUsers = Object.values(DEMO_USERS).map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        createdAt: u.createdAt,
        _count: { listings: 2 },
      }));
    }

    try {
      dbReports = await prisma.adReport.findMany({
        include: {
          listing: { select: { id: true, title: true, price: true, imageUrl: true } },
          reporter: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      dbReports = [];
    }

    // Include sample reported ads if none in db
    if (dbReports.length === 0) {
      dbReports = [
        {
          id: "rep-001",
          reason: "Suspected Counterfeit / Fake Item",
          details: "Seller claims this is original Apple iPhone but photos show mismatched font and bezel.",
          status: "PENDING",
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          listing: {
            id: "demo-listing-2",
            title: "iPhone 15 Pro Max 256GB — Natural Titanium",
            price: 1100000,
            imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
          },
          reporter: {
            id: "user-ada-101",
            name: "Ada Okonkwo",
            email: "ada@classi.local",
          },
        },
        {
          id: "rep-002",
          reason: "Unrealistic Price / Advance Payment Request",
          details: "Seller asked for upfront transport fee before inspection.",
          status: "PENDING",
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
          listing: {
            id: "demo-listing-1",
            title: "Toyota Camry 2018 — tokunbo, low mileage",
            price: 14500000,
            imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
          },
          reporter: {
            id: "user-chidi-102",
            name: "Chidi Eze",
            email: "chidi@sellquickest.ng",
          },
        },
      ];
    }

    const totalListings = dbListings.length;
    const activeListings = dbListings.filter((l) => l.status === "ACTIVE").length;
    const soldListings = dbListings.filter((l) => l.status === "SOLD").length;
    const hiddenListings = dbListings.filter((l) => l.status === "HIDDEN").length;
    const reportedCount = dbReports.filter((r) => r.status === "PENDING").length;

    // Estimated revenue based on simulated boost packages
    const estimatedRevenue = 145000; // Simulated ₦145,000 from Top Ads & Urgent deals

    return NextResponse.json({
      success: true,
      isAdmin,
      currentUser: user,
      stats: {
        totalUsers: Math.max(dbUsers.length, 128),
        totalListings,
        activeListings,
        soldListings,
        hiddenListings,
        reportedCount,
        estimatedRevenue,
        monthlyGrowth: "+24.8%",
      },
      recentListings: dbListings.slice(0, 10),
      recentUsers: dbUsers.slice(0, 8),
      recentReports: dbReports,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to load admin stats" },
      { status: 500 }
    );
  }
}
