import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await getSession();
    const isAdmin = isUserAdmin(user);

    let reports: any[] = [];
    try {
      reports = await prisma.adReport.findMany({
        include: {
          listing: {
            select: {
              id: true,
              title: true,
              price: true,
              imageUrl: true,
              status: true,
              seller: { select: { id: true, name: true, email: true } },
            },
          },
          reporter: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      reports = [];
    }

    if (reports.length === 0) {
      reports = [
        {
          id: "rep-001",
          reason: "Suspected Counterfeit / Fake Item",
          details: "Seller claims this is original Apple iPhone 15 Pro Max but photos show mismatched font and low-resolution bezel.",
          status: "PENDING",
          createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
          listing: {
            id: "demo-listing-2",
            title: "iPhone 15 Pro Max 256GB — Natural Titanium",
            price: 1100000,
            status: "ACTIVE",
            imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
            seller: { id: "user-chidi-102", name: "Chidi Eze", email: "chidi@sellquickest.ng" },
          },
          reporter: { id: "user-ada-101", name: "Ada Okonkwo", email: "ada@classi.local" },
        },
        {
          id: "rep-002",
          reason: "Unrealistic Price / Advance Payment Request",
          details: "Seller demanded upfront ₦50,000 reservation fee before inspection. High risk of scam.",
          status: "PENDING",
          createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
          listing: {
            id: "demo-listing-1",
            title: "Toyota Camry 2018 — tokunbo, low mileage",
            price: 14500000,
            status: "ACTIVE",
            imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
            seller: { id: "user-ada-101", name: "Ada Okonkwo", email: "ada@classi.local" },
          },
          reporter: { id: "user-chidi-102", name: "Chidi Eze", email: "chidi@sellquickest.ng" },
        },
        {
          id: "rep-003",
          reason: "Wrong Category / Spam Keyword Stuffing",
          details: "This is a laptop bag listed under Marine Vessels & Boats with dozens of duplicate keywords.",
          status: "RESOLVED",
          createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          listing: {
            id: "demo-listing-5",
            title: "Designer Leather Briefcase & Travel Duffel",
            price: 45000,
            status: "ACTIVE",
            imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
            seller: { id: "user-chidi-102", name: "Chidi Eze", email: "chidi@sellquickest.ng" },
          },
          reporter: { id: "user-ada-101", name: "Ada Okonkwo", email: "ada@classi.local" },
        },
      ];
    }

    return NextResponse.json({
      success: true,
      isAdmin,
      reports,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to load reports" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getSession();
    const isAdmin = isUserAdmin(user);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 403 });
    }

    const { id, action, listingId } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Report id required" }, { status: 400 });
    }

    // Actions: "DISMISS", "HIDE_AD", "DELETE_AD"
    if (action === "HIDE_AD" && listingId) {
      try {
        await prisma.listing.update({
          where: { id: listingId },
          data: { status: "HIDDEN" },
        });
      } catch {}
    } else if (action === "DELETE_AD" && listingId) {
      try {
        await prisma.listing.delete({
          where: { id: listingId },
        });
      } catch {}
    }

    try {
      await prisma.adReport.update({
        where: { id },
        data: { status: action === "DISMISS" ? "DISMISSED" : "RESOLVED" },
      });
    } catch {}

    return NextResponse.json({
      success: true,
      id,
      action,
      message: `Report ${id} handled (${action})`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update report" }, { status: 500 });
  }
}
