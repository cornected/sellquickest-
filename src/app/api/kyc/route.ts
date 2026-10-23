import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const user = await getSession();
    const { searchParams } = new URL(req.url);
    const mineOnly = searchParams.get("mine") === "1";

    const where: any = {};
    if (mineOnly && user?.id) {
      where.userId = user.id;
    }

    const requests = await prisma.kycVerification.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, requests });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch KYC requests" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    const userId = user?.id || "user-ada-101";
    const body = await req.json();

    const businessName = String(body.businessName || user?.name || "").trim();
    const documentType = String(body.documentType || "NIN").trim();
    const documentNumber = String(body.documentNumber || "").trim();
    const documentUrl = body.documentUrl ? String(body.documentUrl) : null;

    if (!businessName || !documentNumber) {
      return NextResponse.json(
        { error: "Business/Full name and Document ID number are required." },
        { status: 400 }
      );
    }

    const record = await prisma.kycVerification.create({
      data: {
        businessName,
        documentType,
        documentNumber,
        documentUrl,
        status: "PENDING",
        userId,
      },
    });

    await prisma.notification
      .create({
        data: {
          userId,
          type: "info",
          title: "KYC Verification Submitted",
          text: `Your ${documentType} (${documentNumber}) for "${businessName}" has been submitted for merchant verification review.`,
          read: false,
        },
      })
      .catch(() => {});

    return NextResponse.json({ success: true, request: record });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not submit KYC verification" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, userId } = body;
    if (!id || !status) {
      return NextResponse.json(
        { error: "KYC ID and status are required" },
        { status: 400 }
      );
    }

    const updated = await prisma.kycVerification.update({
      where: { id },
      data: { status },
    });

    const targetUserId = userId || updated?.userId;
    if (targetUserId && status === "APPROVED") {
      await prisma.user
        .update({
          where: { id: targetUserId },
          data: { isVerified: true },
        })
        .catch(() => {});

      await prisma.notification
        .create({
          data: {
            userId: targetUserId,
            type: "success",
            title: "✓ Verified Seller Badge Awarded!",
            text: "Congratulations! Your KYC identity document has been approved. Your listings now carry the Verified Merchant badge.",
            read: false,
          },
        })
        .catch(() => {});
    }

    return NextResponse.json({ success: true, request: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update KYC request" },
      { status: 500 }
    );
  }
}
