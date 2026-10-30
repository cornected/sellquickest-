import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const user = body?.user;
    const rawUsers = body?.users;
    const listings = Array.isArray(body?.listings) ? body.listings : [];

    let syncedUser: any = null;
    let syncedUsersCount = 0;

    // Collect all users to upsert (active session user + registered users map/array)
    const usersToSync: any[] = [];
    if (user && typeof user === "object" && (user.id || user.email)) {
      usersToSync.push(user);
    }
    if (Array.isArray(rawUsers)) {
      for (const u of rawUsers) {
        if (u && typeof u === "object" && (u.id || u.email)) {
          usersToSync.push(u);
        }
      }
    } else if (rawUsers && typeof rawUsers === "object") {
      for (const u of Object.values(rawUsers)) {
        if (u && typeof u === "object" && ((u as any).id || (u as any).email)) {
          usersToSync.push(u);
        }
      }
    }

    // 1. Upsert all user profiles (including avatarUrl) into server store & DB
    for (const u of usersToSync) {
      const uid = String(u.id || `usr-${Date.now()}`);
      const cleanEmail = String(u.email || `user-${uid}@sellquickest.ng`)
        .toLowerCase()
        .trim();

      const updatePayload: Record<string, any> = {
        name: u.name || "SellQuickest Member",
        email: cleanEmail,
      };
      if (u.phone) updatePayload.phone = u.phone;
      if (u.avatarUrl) updatePayload.avatarUrl = u.avatarUrl;

      const updated = await prisma.user
        .update({
          where: { id: uid },
          data: updatePayload,
        })
        .catch(() => null);

      if (user && (u.id === user.id || u.email === user.email)) {
        syncedUser = updated;
      }
      syncedUsersCount++;
    }

    // 2. Ensure all client-posted listings exist in server store & DB with latest seller info
    let syncedCount = 0;
    for (const item of listings) {
      if (!item || typeof item !== "object" || !item.id || !item.title) continue;

      const existing = await prisma.listing
        .findUnique({ where: { id: String(item.id) } })
        .catch(() => null);

      const sellerId = String(
        item.sellerId || item.seller?.id || user?.id || "user-cornelius-100"
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
                item.categoryId || item.category?.id || "cat-fashion"
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

    if (syncedUser || syncedUsersCount > 0 || syncedCount > 0) {
      try {
        revalidatePath("/", "layout");
      } catch {}
    }

    return NextResponse.json({
      ok: true,
      syncedCount,
      syncedUsersCount,
      user: syncedUser,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Sync failed" },
      { status: 500 }
    );
  }
}
