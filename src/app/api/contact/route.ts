import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const mine = req.nextUrl.searchParams.get("mine");
    const emailParam = req.nextUrl.searchParams.get("email");
    const user = await getSession();

    const allTickets = await prisma.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (mine === "1" || emailParam) {
      const targetEmail = (emailParam || user?.email || "").toLowerCase().trim();
      const filtered = targetEmail
        ? allTickets.filter((t: any) => String(t.email || "").toLowerCase().trim() === targetEmail)
        : [];
      return NextResponse.json({ success: true, tickets: filtered });
    }

    return NextResponse.json({ success: true, tickets: allTickets });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not load support tickets" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = body.phone ? String(body.phone).trim() : null;
    const subject = String(body.subject || "General Inquiry").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: "OPEN",
      },
    });

    await prisma.notification
      .create({
        data: {
          userId: user?.id || "user-ada-101",
          type: "info",
          title: `Support Ticket Received: ${subject}`,
          text: `We received your inquiry ("${message.slice(0, 60)}${message.length > 60 ? "..." : ""}") and will reply to ${email}.`,
          read: false,
        },
      })
      .catch(() => {});

    return NextResponse.json({ success: true, ticket });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not submit support ticket" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, replyText } = body;
    if (!id || !status) {
      return NextResponse.json(
        { error: "Ticket ID and status are required" },
        { status: 400 }
      );
    }

    const allTickets = await prisma.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
    });
    const existing = allTickets.find((t: any) => t.id === id);

    const updateData: any = { status };
    if (replyText && String(replyText).trim() && existing) {
      const cleanReply = String(replyText).trim();
      const baseMsg = String(existing.message || "").split("\n\n--- ADMIN REPLY ---\n")[0];
      updateData.message = `${baseMsg}\n\n--- ADMIN REPLY ---\n${cleanReply}`;
    }

    const updated = await prisma.supportTicket.update({
      where: { id },
      data: updateData,
    });

    // Notify the customer in-app if they have a matching user account
    if (existing?.email) {
      const customer = await prisma.user
        .findUnique({ where: { email: String(existing.email).toLowerCase().trim() } })
        .catch(() => null);

      const targetUserId = customer?.id || "user-ada-101";
      await prisma.notification
        .create({
          data: {
            userId: targetUserId,
            type: status === "RESOLVED" ? "success" : "info",
            title: replyText
              ? `🎧 Support Reply: ${existing.subject}`
              : `Support Ticket ${status}: ${existing.subject}`,
            text: replyText
              ? `SellQuickest Support replied: "${String(replyText).trim()}"`
              : `Your support ticket "${existing.subject}" has been marked as ${status}.`,
            read: false,
          },
        })
        .catch(() => {});
    }

    return NextResponse.json({ success: true, ticket: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Could not update support ticket" },
      { status: 500 }
    );
  }
}
