import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isUserAdmin } from "@/lib/adminAuth";

// Default promotion tiers
const DEFAULT_PACKAGES = [
  {
    id: "standard",
    name: "Standard Ad",
    price: 0,
    durationDays: 30,
    badge: "FREE FOREVER",
    badgeColor: "secondary",
    features: [
      "Normal search placement",
      "Up to 10 product images",
      "Direct buyer messaging",
      "Show phone number",
    ],
    enabled: true,
  },
  {
    id: "top-ad",
    name: "Top Ad",
    price: 3500,
    durationDays: 7,
    badge: "MOST POPULAR",
    badgeColor: "success",
    features: [
      "Pinned to the top of search results",
      "Up to 10x more buyer views",
      "Distinct golden highlight border",
      "Prioritized in category feeds",
      "Instant buyer inquiry notifications",
    ],
    enabled: true,
  },
  {
    id: "urgent",
    name: "Urgent Deal",
    price: 2000,
    durationDays: 3,
    badge: "QUICK SALES",
    badgeColor: "danger",
    features: [
      "Eye-catching red 'URGENT' badge",
      "Targeted at ready-to-pay buyers",
      "Featured on homepage Deals shelf",
      "3x higher click-through rate",
    ],
    enabled: true,
  },
  {
    id: "bump",
    name: "Bump to Top",
    price: 1000,
    durationDays: 1,
    badge: "INSTANT REFRESH",
    badgeColor: "primary",
    features: [
      "Instantly resets posting date to now",
      "Bumps ad back to the top of results",
      "Cost-effective refresh",
    ],
    enabled: true,
  },
];

let currentPackages = [...DEFAULT_PACKAGES];

export async function GET() {
  const user = await getSession();
  const isAdmin = isUserAdmin(user);
  return NextResponse.json({
    success: true,
    isAdmin,
    packages: currentPackages,
    recentTransactions: [
      { id: "tx-101", user: "Ada Okonkwo", package: "Top Ad (7 Days)", amount: 3500, date: "Today, 10:14 AM", status: "SUCCESS" },
      { id: "tx-102", user: "Emeka Kalu", package: "Urgent Deal", amount: 2000, date: "Yesterday, 3:30 PM", status: "SUCCESS" },
      { id: "tx-103", user: "Chidi Eze", package: "Top Ad (7 Days)", amount: 3500, date: "Oct 17, 2026", status: "SUCCESS" },
      { id: "tx-104", user: "Fatima Bello", package: "Bump to Top", amount: 1000, date: "Oct 16, 2026", status: "SUCCESS" },
    ],
  });
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getSession();
    const isAdmin = isUserAdmin(user);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 403 });
    }

    const { packages } = await req.json();
    if (Array.isArray(packages)) {
      currentPackages = packages;
    }
    return NextResponse.json({ success: true, packages: currentPackages });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update packages" }, { status: 500 });
  }
}
