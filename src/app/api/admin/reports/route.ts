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

    return NextResponse.json({
      success: true,
      isAdmin,
      reports,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to load reports" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    const body = await req.json();
    const reason = String(body.reason || "Suspected Scam / Fraud").trim();
    const details = String(body.details || "").trim();
    let listingId = String(body.listingId || "").trim();
    const adLinkOrTitle = String(body.adLinkOrTitle || "").trim();

    if (!listingId && adLinkOrTitle) {
      const match = adLinkOrTitle.match(/\/listing\/([a-zA-Z0-9_-]+)/);
      if (match?.[1]) {
        listingId = match[1];
      } else {
        const found = await prisma.listing.findFirst({
          where: {
            OR: [{ title: { contains: adLinkOrTitle } }],
          },
        });
        if (found) listingId = found.id;
      }
    }

    if (!listingId) {
      const firstListing = await prisma.listing.findFirst();
      listingId = firstListing?.id || "demo-listing-1";
    }

    const created = await prisma.adReport.create({
      data: {
        reason,
        details: details || (adLinkOrTitle ? `Reported target: ${adLinkOrTitle}` : ""),
        status: "PENDING",
        listingId,
        ...(user?.id ? { reporterId: user.id } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      report: created,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not submit report" },
      { status: 500 }
    );
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
