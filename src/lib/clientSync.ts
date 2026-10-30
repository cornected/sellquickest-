"use client";

import { DEMO_LISTINGS } from "@/lib/demoData";

const DEFAULT_DEMO_TITLES = new Set(
  DEMO_LISTINGS.filter((d) => String(d.id).startsWith("demo-listing-")).map((d) =>
    String(d.title || "").toLowerCase().trim()
  )
);

function compressDataUrl(
  dataUrl: string,
  maxDim = 640,
  quality = 0.65
): Promise<string> {
  return new Promise((resolve) => {
    if (
      typeof window === "undefined" ||
      !dataUrl ||
      !dataUrl.startsWith("data:image/") ||
      dataUrl.length < 70000
    ) {
      resolve(dataUrl);
      return;
    }

    const img = new window.Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl.length > 250000 ? "/placeholder.png" : dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      } catch {
        resolve(dataUrl.length > 250000 ? "/placeholder.png" : dataUrl);
      }
    };
    img.onerror = () => {
      resolve(dataUrl.length > 250000 ? "/placeholder.png" : dataUrl);
    };
    img.src = dataUrl;
  });
}

async function prepareSlimListing(item: any): Promise<any> {
  if (!item || typeof item !== "object") return null;

  let firstImg = "";
  try {
    const raw = item.imageUrl;
    if (typeof raw === "string") {
      const trimmed = raw.trim();
      if (trimmed.startsWith("[")) {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          firstImg = String(parsed[0] || "");
        }
      } else if (trimmed.startsWith("data:")) {
        firstImg = trimmed;
      } else if (trimmed.includes(",")) {
        firstImg = trimmed.split(",")[0].trim();
      } else {
        firstImg = trimmed;
      }
    } else if (Array.isArray(raw) && raw.length > 0) {
      firstImg = String(raw[0] || "");
    }
  } catch {
    firstImg = "";
  }

  const compressedImg = firstImg ? await compressDataUrl(firstImg, 640, 0.65) : "";

  let sellerCopy = item.seller ? { ...item.seller } : undefined;
  if (sellerCopy?.avatarUrl && typeof sellerCopy.avatarUrl === "string") {
    sellerCopy.avatarUrl = await compressDataUrl(sellerCopy.avatarUrl, 240, 0.7);
  }

  return {
    ...item,
    imageUrl: compressedImg ? JSON.stringify([compressedImg]) : item.imageUrl || "",
    seller: sellerCopy,
  };
}

export function getLocalUserAds(): any[] {
  if (typeof window === "undefined") return [];

  const collected: any[] = [];
  const seenIds = new Set<string>();

  const addListing = (item: any) => {
    if (!item || typeof item !== "object" || !item.id || !item.title) return;
    const idStr = String(item.id);
    if (idStr.startsWith("demo-listing-")) return;
    if (seenIds.has(idStr)) return;
    seenIds.add(idStr);
    collected.push(item);
  };

  try {
    const postedRaw = localStorage.getItem("sq_my_posted_listings");
    if (postedRaw) {
      const parsed = JSON.parse(postedRaw);
      if (Array.isArray(parsed)) {
        for (const item of parsed) addListing(item);
      }
    }
  } catch {}

  try {
    const latestRaw = sessionStorage.getItem("sq_latest_listing");
    if (latestRaw) {
      const latest = JSON.parse(latestRaw);
      addListing(latest);
    }
  } catch {}

  // Also recover any user-posted ad from sq_recently_viewed that isn't a default demo listing
  try {
    const recentRaw = localStorage.getItem("sq_recently_viewed");
    if (recentRaw) {
      const recentList = JSON.parse(recentRaw);
      if (Array.isArray(recentList)) {
        for (const item of recentList) {
          if (!item || !item.id || !item.title) continue;
          const idStr = String(item.id);
          const titleLower = String(item.title).toLowerCase().trim();
          if (idStr.startsWith("demo-listing-")) continue;
          if (DEFAULT_DEMO_TITLES.has(titleLower)) continue;
          if (
            idStr.startsWith("cmuf") ||
            idStr.startsWith("cmug") ||
            idStr.startsWith("cmup")
          ) {
            continue;
          }
          addListing(item);
        }
      }
    }
  } catch {}

  return collected;
}

let syncInProgress = false;

export async function syncClientDataToServer(): Promise<void> {
  if (typeof window === "undefined" || syncInProgress) return;
  syncInProgress = true;

  try {
    let localUser: any = null;
    let regUsers: Record<string, any> = {};

    try {
      const storedUserRaw = localStorage.getItem("sq_session");
      if (storedUserRaw) localUser = JSON.parse(storedUserRaw);
    } catch {}

    try {
      const regUsersRaw = localStorage.getItem("sq_registered_users");
      if (regUsersRaw) regUsers = JSON.parse(regUsersRaw) || {};
    } catch {}

    const rawListings = getLocalUserAds();

    if (localUser?.avatarUrl && typeof localUser.avatarUrl === "string") {
      localUser = {
        ...localUser,
        avatarUrl: await compressDataUrl(localUser.avatarUrl, 240, 0.7),
      };
    }

    const slimRegUsers: Record<string, any> = {};
    if (regUsers && typeof regUsers === "object") {
      for (const [k, v] of Object.entries(regUsers)) {
        if (v && typeof v === "object") {
          const copy = { ...(v as any) };
          if (copy.avatarUrl && typeof copy.avatarUrl === "string") {
            copy.avatarUrl = await compressDataUrl(copy.avatarUrl, 240, 0.7);
          }
          slimRegUsers[k] = copy;
        }
      }
    }

    // 1. Sync users first in a small payload
    if (localUser?.id || Object.keys(slimRegUsers).length > 0) {
      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: localUser,
          users: slimRegUsers,
          listings: [],
        }),
      }).catch(() => {});
    }

    // 2. Sync each listing individually so payload size never exceeds server limits
    for (const rawItem of rawListings) {
      const slimItem = await prepareSlimListing(rawItem);
      if (!slimItem) continue;
      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: localUser,
          listings: [slimItem],
        }),
      }).catch(() => {});
    }
  } catch {
    // ignore errors
  } finally {
    syncInProgress = false;
  }
}
