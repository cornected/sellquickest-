import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const user = await getSession();
    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get("listingId") || "";
    const conversationsMode = searchParams.get("conversations") === "1";

    if (conversationsMode) {
      const allMessages = await prisma.message.findMany({
        orderBy: { createdAt: "desc" },
      });

      const byListing = new Map<string, any[]>();
      for (const m of allMessages) {
        if (!m.listingId) continue;
        if (!byListing.has(m.listingId)) {
          byListing.set(m.listingId, []);
        }
        byListing.get(m.listingId)!.push(m);
      }

      const conversations: any[] = [];
      for (const [lid, msgs] of byListing.entries()) {
        const listing = await prisma.listing.findUnique({
          where: { id: lid },
          include: { seller: true },
        });
        if (!listing) continue;
        let displayImage = "/placeholder.png";
        if (listing.imageUrl) {
          displayImage = listing.imageUrl.includes(",")
            ? listing.imageUrl.split(",")[0].trim()
            : listing.imageUrl.trim();
        }
        conversations.push({
          listingId: listing.id,
          listingTitle: listing.title,
          listingPrice: listing.price,
          listingImage: displayImage,
          sellerName: listing.seller?.name || "Seller",
          messageCount: msgs.length,
          lastUpdated: msgs[0]?.createdAt || new Date().toISOString(),
        });
      }

      return NextResponse.json({ success: true, conversations });
    }

    const where: any = {};
    if (listingId) where.listingId = listingId;
    else if (user?.id) where.receiverId = user.id;

    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ success: true, messages });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    const body = await req.json();
    const listingId = String(body.listingId || "").trim();
    const text = String(body.text || "").trim();
    const imageUrl = body.imageUrl ? String(body.imageUrl) : null;
    const offerJson = body.offer ? JSON.stringify(body.offer) : null;

    if (!listingId || (!text && !imageUrl && !offerJson)) {
      return NextResponse.json(
        { error: "Listing ID and message content required" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    const senderId = body.senderId || user?.id || "user-ada-101";
    const receiverId =
      body.receiverId ||
      (listing?.sellerId && listing.sellerId !== senderId
        ? listing.sellerId
        : "user-chidi-102");

    const msg = await prisma.message.create({
      data: {
        text: text || "Sent an attachment",
        imageUrl,
        offerJson,
        senderId,
        receiverId,
        listingId,
        read: false,
      },
    });

    return NextResponse.json({ success: true, message: msg });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not send message" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { messageId, status } = body;
    if (!messageId || !status) {
      return NextResponse.json(
        { error: "Message ID and status required" },
        { status: 400 }
      );
    }

    const existing = await prisma.message.findMany({
      where: { id: messageId },
    });
    const target = existing[0];
    if (target && target.offerJson) {
      const parsed = JSON.parse(target.offerJson);
      parsed.status = status;
      const updated = await prisma.message.update({
        where: { id: messageId },
        data: { offerJson: JSON.stringify(parsed) },
      });
      return NextResponse.json({ success: true, message: updated });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not update offer status" },
      { status: 500 }
    );
  }
}

