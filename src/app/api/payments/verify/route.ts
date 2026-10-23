import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const transactions = await prisma.paymentTransaction.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, transactions });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch payment transactions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    const userId = user?.id || "user-ada-101";
    const body = await req.json();

    const gateway = String(body.gateway || "PAYSTACK").toUpperCase();
    const planName = String(body.planName || "TOP AD (7 Days)");
    const tier = String(body.tier || "top").toLowerCase();
    const amount = Number(body.amount) || 0;
    const listingId = body.listingId ? String(body.listingId) : null;
    const reference =
      body.reference ||
      `SQ-${gateway === "FLUTTERWAVE" ? "FLW" : "PAY"}-${Date.now().toString().slice(-6)}`;

    const transaction = await prisma.paymentTransaction.create({
      data: {
        reference,
        planName,
        amount,
        gateway,
        status: "SUCCESS",
        listingId,
        userId,
      },
    });

    const isEscrow = tier === "escrow";
    const expiresAt = new Date();
    if (tier === "top") expiresAt.setDate(expiresAt.getDate() + 7);
    else if (tier === "urgent") expiresAt.setDate(expiresAt.getDate() + 3);
    else expiresAt.setDate(expiresAt.getDate() + 1);

    const boostLabel = isEscrow
      ? "ESCROW HELD"
      : tier === "top"
        ? "TOP AD"
        : tier === "urgent"
          ? "URGENT"
          : "BOOSTED";

    let updatedListing: any = null;
    if (listingId && !isEscrow) {
      updatedListing = await prisma.listing
        .update({
          where: { id: listingId },
          data: {
            boostTier: boostLabel,
            boostExpiresAt: expiresAt,
          },
        })
        .catch(() => null);
    } else if (listingId && isEscrow) {
      updatedListing = await prisma.listing
        .findUnique({ where: { id: listingId } })
        .catch(() => null);
    }

    await prisma.notification
      .create({
        data: {
          userId,
          type: "success",
          title: isEscrow
            ? `🛡️ Escrow Payment Secured (${reference})`
            : `Payment Confirmed (${reference})`,
          text: isEscrow
            ? `Your payment of ₦${amount.toLocaleString()} via ${gateway} is safely held in SellQuickest Escrow until you inspect and confirm delivery.`
            : `${gateway} payment of ₦${amount.toLocaleString()} for ${planName} succeeded. Boost is now active!`,
          listingId: listingId || undefined,
          read: false,
        },
      })
      .catch(() => {});

    if (isEscrow && updatedListing?.sellerId && updatedListing.sellerId !== userId) {
      await prisma.notification
        .create({
          data: {
            userId: updatedListing.sellerId,
            type: "success",
            title: `🛡️ New Escrow Order (${reference})`,
            text: `A buyer deposited ₦${amount.toLocaleString()} into SellQuickest Escrow for "${updatedListing.title}". Arrange delivery to release funds!`,
            listingId: listingId || undefined,
            read: false,
          },
        })
        .catch(() => {});
    }

    return NextResponse.json({
      success: true,
      transaction,
      listing: updatedListing,
      boostLabel,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}
