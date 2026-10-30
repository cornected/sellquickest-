import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const user = body?.user;
    const listings = Array.isArray(body?.listings) ? body.listings : [];

    let syncedUser: any = null;

    // 1. Upsert user profile (including avatarUrl) into server store & DB
    if (user && typeof user === "object" && user.id) {
      const cleanEmail = String(user.email || `user-${user.id}@sellquickest.ng`)
        .toLowerCase()
        .trim();

      const updatePayload: Record<string, any> = {
        name: user.name || "SellQuickest Member",
        email: cleanEmail,
      };
      if (user.phone) updatePayload.phone = user.phone;
      if (user.avatarUrl) updatePayload.avatarUrl = user.avatarUrl;

      syncedUser = await prisma.user.update({
        where: { id: String(user.id) },
        data: updatePayload,
      });
    }

    // 2. Ensure all client-posted listings exist in server store & DB with latest seller info
    let syncedCount = 0;
    for (const item of listings) {
      if (!item || typeof item !== "object" || !item.id || !item.title) continue;

      const existing = await prisma.listing
        .findUnique({ where: { id: String(item.id) } })
        .catch(() => null);

      const sellerId = String(
        item.sellerId || item.seller?.id || user?.id || "user-cornelius-admin"
      );
      const sellerObj = {
        id: sellerId,
        name:
          (user?.id === sellerId ? user?.name : null) ||
          item.seller?.name ||
          syncedUser?.name ||
          "Verified Seller",
        email:
          (user?.id === sellerId ? user?.email : null) ||
          item.seller?.email ||
          syncedUser?.email ||
          `seller-${sellerId}@sellquickest.ng`,
        phone:
          (user?.id === sellerId ? user?.phone : null) ||
          item.seller?.phone ||
          syncedUser?.phone ||
          "",
        avatarUrl:
          (user?.id === sellerId ? user?.avatarUrl : null) ||
          item.seller?.avatarUrl ||
          syncedUser?.avatarUrl ||
          null,
      };

      if (!existing) {
        await prisma.listing
          .create({
            data: {
              id: String(item.id),
              title: String(item.title),
              description: String(item.description || ""),
              spareDetails:
                typeof item.spareDetails === "string"
                  ? item.spareDetails
                  : item.spareDetails
                    ? JSON.stringify(item.spareDetails)
                    : null,
              subcategory: item.subcategory || null,
              location: String(item.location || "Lagos"),
              categoryId: String(
                item.categoryId || item.category?.id || "cat-vehicles"
              ),
              price: Number(item.price) || 0,
              condition: String(item.condition || "Used"),
              imageUrl:
                typeof item.imageUrl === "string"
                  ? item.imageUrl
                  : JSON.stringify(item.imageUrl || []),
              status: item.status || "ACTIVE",
              sellerId,
              createdAt: item.createdAt || new Date().toISOString(),
              seller: sellerObj,
            } as any,
          })
          .catch(() => null);
        syncedCount++;
      } else if (sellerObj.avatarUrl && !existing.seller?.avatarUrl) {
        await prisma.user
          .update({
            where: { id: sellerId },
            data: {
              name: sellerObj.name,
              email: sellerObj.email,
              avatarUrl: sellerObj.avatarUrl,
            },
          })
          .catch(() => null);
      }
    }

    if (syncedUser || syncedCount > 0) {
      try {
        revalidatePath("/", "layout");
      } catch {}
    }

    return NextResponse.json({
      ok: true,
      syncedCount,
      user: syncedUser,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Sync failed" },
      { status: 500 }
    );
  }
}
