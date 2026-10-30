import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { DEMO_CATEGORIES, DEMO_LISTINGS, DEMO_USERS, DemoCategory, DemoListing, DemoUser } from "@/lib/demoData";

const DISK_STORE_PATH = "/tmp/sellquickest-store.json";
const WORKSPACE_STORE_DIR = path.join(process.cwd(), ".data");
const WORKSPACE_STORE_PATH = path.join(WORKSPACE_STORE_DIR, "sellquickest-store.json");

export const dbUrl =
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  "postgresql://postgres:password@localhost:5432/sellquickest?schema=public";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = dbUrl;
}

interface MemoryStore {
  categories: DemoCategory[];
  listings: DemoListing[];
  users: Record<string, any>;
  reviews: any[];
  messages: any[];
  adReports: any[];
  notifications: any[];
  savedListings: { id: string; userId: string; listingId: string; createdAt: string }[];
  supportTickets: any[];
  kycVerifications: any[];
  paymentTransactions: any[];
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  __sqMemoryStore?: MemoryStore;
  __sqStoreMtime?: number;
};

function createInitialMemoryStore(): MemoryStore {
  const usersCopy: Record<string, any> = {
    [DEMO_USERS.cornected.id]: { ...DEMO_USERS.cornected, isVerified: true, isBanned: false },
    [DEMO_USERS.cornelius.id]: { ...DEMO_USERS.cornelius, isVerified: true, isBanned: false },
    [DEMO_USERS.ada.id]: { ...DEMO_USERS.ada, isVerified: true, isBanned: false },
    [DEMO_USERS.chidi.id]: { ...DEMO_USERS.chidi, isVerified: false, isBanned: false },
  };
  const categoriesCopy = DEMO_CATEGORIES.map((c) => ({ ...c, _count: { ...c._count } }));
  const listingsCopy = DEMO_LISTINGS.map((l) => ({
    ...l,
    seller: l.seller ? { ...l.seller } : usersCopy[l.sellerId],
    category: l.category ? { ...l.category } : categoriesCopy.find((c) => c.id === l.categoryId),
  }));

  const initialReports = [
    {
      id: "rep-001",
      reason: "Suspected Counterfeit / Fake Item",
      details: "Seller claims this is original Apple iPhone 14 Pro Max but photos show mismatched font and bezel.",
      status: "PENDING",
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      listingId: "demo-listing-3",
      reporterId: "user-ada-101",
      listing: {
        id: "demo-listing-3",
        title: "iPhone 14 Pro Max 256GB — UK used",
        price: 720000,
        status: "ACTIVE",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
        seller: { id: "user-ada-101", name: "Ada Obi", email: "ada@classi.local" },
      },
      reporter: { id: "user-chidi-102", name: "Chidi Eze", email: "chidi@classi.local" },
    },
    {
      id: "rep-002",
      reason: "Unrealistic Price / Advance Payment Request",
      details: "Seller demanded upfront ₦50,000 reservation fee before inspection.",
      status: "PENDING",
      createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      listingId: "demo-listing-1",
      reporterId: "user-chidi-102",
      listing: {
        id: "demo-listing-1",
        title: "Toyota Camry 2018 — tokunbo, low mileage",
        price: 14500000,
        status: "ACTIVE",
        imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
        seller: { id: "user-chidi-102", name: "Chidi Eze", email: "chidi@classi.local" },
      },
      reporter: { id: "user-ada-101", name: "Ada Obi", email: "ada@classi.local" },
    },
    {
      id: "rep-003",
      reason: "Wrong Category / Spam Keyword Stuffing",
      details: "Listed with duplicate keywords across multiple categories.",
      status: "RESOLVED",
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      listingId: "demo-listing-5",
      reporterId: "user-ada-101",
      listing: {
        id: "demo-listing-5",
        title: "MacBook Pro 14\" M2 — 16GB / 512GB",
        price: 1850000,
        status: "ACTIVE",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
        seller: { id: "user-chidi-102", name: "Chidi Eze", email: "chidi@classi.local" },
      },
      reporter: { id: "user-ada-101", name: "Ada Obi", email: "ada@classi.local" },
    },
  ];

  const initialReviews = [
    {
      id: "rev-1",
      rating: 5,
      comment: "Very honest and reliable seller! The item was exactly as described. We met at Ikeja City Mall.",
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      buyerId: "user-chidi-102",
      sellerId: "user-ada-101",
      listingId: "demo-listing-2",
      buyer: { id: "user-chidi-102", name: "Emeka Okafor" },
      reviewerName: "Emeka Okafor",
    },
    {
      id: "rev-2",
      rating: 5,
      comment: "Quick transaction and courteous communication. Tested everything on the spot and made transfer.",
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      buyerId: "user-ada-101",
      sellerId: "user-chidi-102",
      listingId: "demo-listing-1",
      buyer: { id: "user-ada-101", name: "Bolanle Adebayo" },
      reviewerName: "Bolanle Adebayo",
    },
  ];

  const initialMessages = [
    {
      id: "msg-seed-1",
      text: "Hello! Is this Toyota Camry 2018 still available for inspection in Ikeja?",
      imageUrl: null,
      offerJson: null,
      read: true,
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      senderId: "user-ada-101",
      receiverId: "user-chidi-102",
      listingId: "demo-listing-1",
    },
    {
      id: "msg-seed-2",
      text: "Yes, it is available! You can inspect it today at Ikeja City Mall parking lot.",
      imageUrl: null,
      offerJson: null,
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
      senderId: "user-chidi-102",
      receiverId: "user-ada-101",
      listingId: "demo-listing-1",
    },
  ];

  const initialNotifications = [
    {
      id: "notif-seed-1",
      title: "New reply from Chidi Eze",
      text: "Yes, it is available! You can inspect it today at Ikeja City Mall parking lot.",
      type: "message",
      listingId: "demo-listing-1",
      listingTitle: "Toyota Camry 2018 — tokunbo, low mileage",
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
      userId: "user-ada-101",
    },
  ];

  const initialSupportTickets = [
    {
      id: "tkt-seed-1",
      name: "Tunde Adeyemi",
      email: "tunde@example.com",
      phone: "0803 456 7890",
      subject: "Ad Posting & Promotion",
      message: "Hello, I boosted my Toyota Highlander listing with Paystack and want to confirm my 7-day Top Ad duration.",
      status: "OPEN",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
  ];

  const initialKyc = [
    {
      id: "kyc-seed-1",
      businessName: "Chidi Motors & Auto Imports Ltd",
      documentType: "CAC Certificate",
      documentNumber: "RC-1948204",
      documentUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      status: "PENDING",
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      userId: "user-chidi-102",
      user: { id: "user-chidi-102", name: "Chidi Eze", email: "chidi@classi.local", phone: "+234 809 876 5432" },
    },
  ];

  const initialTransactions = [
    {
      id: "tx-seed-1",
      reference: "SQ-PAY-894021",
      planName: "TOP AD (7 Days)",
      amount: 3500,
      gateway: "PAYSTACK",
      status: "SUCCESS",
      listingId: "demo-listing-1",
      userId: "user-chidi-102",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: "tx-seed-2",
      reference: "SQ-FLW-541098",
      planName: "URGENT SALE (3 Days)",
      amount: 2000,
      gateway: "FLUTTERWAVE",
      status: "SUCCESS",
      listingId: "demo-listing-3",
      userId: "user-ada-101",
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
  ];

  return {
    categories: categoriesCopy,
    listings: listingsCopy,
    users: usersCopy,
    reviews: initialReviews,
    messages: initialMessages,
    adReports: initialReports,
    notifications: initialNotifications,
    savedListings: [],
    supportTickets: initialSupportTickets,
    kycVerifications: initialKyc,
    paymentTransactions: initialTransactions,
  };
}

function saveStoreToDisk(store: MemoryStore) {
  const payload = JSON.stringify(store);
  try {
    if (!fs.existsSync(WORKSPACE_STORE_DIR)) {
      fs.mkdirSync(WORKSPACE_STORE_DIR, { recursive: true });
    }
    fs.writeFileSync(WORKSPACE_STORE_PATH, payload, "utf8");
  } catch {
    // ignore read-only workspace errors
  }
  try {
    fs.writeFileSync(DISK_STORE_PATH, payload, "utf8");
    const stat = fs.statSync(DISK_STORE_PATH);
    globalForPrisma.__sqStoreMtime = stat.mtimeMs;
  } catch {
    try {
      if (fs.existsSync(WORKSPACE_STORE_PATH)) {
        const stat = fs.statSync(WORKSPACE_STORE_PATH);
        globalForPrisma.__sqStoreMtime = stat.mtimeMs;
      }
    } catch {}
  }
}

function getStore(): MemoryStore {
  if (!globalForPrisma.__sqMemoryStore) {
    globalForPrisma.__sqMemoryStore = createInitialMemoryStore();
  } else {
    delete globalForPrisma.__sqMemoryStore.users["user-cornected-103"];
    if (!globalForPrisma.__sqMemoryStore.users["cmvkgvitv0000s62hw5zlq3xi"]) {
      globalForPrisma.__sqMemoryStore.users["cmvkgvitv0000s62hw5zlq3xi"] = { ...DEMO_USERS.cornected };
    }
    globalForPrisma.__sqMemoryStore.listings = globalForPrisma.__sqMemoryStore.listings.filter(
      (l) => l && l.id !== "ad-cornected-suit-2"
    );
    const hasRealSuitAd = globalForPrisma.__sqMemoryStore.listings.some(
      (l) =>
        l &&
        l.id !== "ad-cornected-suit" &&
        String(l.title || "").toLowerCase().trim() === "hvgfhvjgvgvghv"
    );
    if (hasRealSuitAd) {
      globalForPrisma.__sqMemoryStore.listings = globalForPrisma.__sqMemoryStore.listings.filter(
        (l) => l.id !== "ad-cornected-suit"
      );
    } else {
      const cornectedAd = DEMO_LISTINGS.find((l) => l.id === "ad-cornected-suit");
      if (cornectedAd) {
        const existingIdx = globalForPrisma.__sqMemoryStore.listings.findIndex(
          (l) => l.id === "ad-cornected-suit"
        );
        const hydrated = hydrateListingRelations(cornectedAd, globalForPrisma.__sqMemoryStore);
        if (existingIdx >= 0) {
          globalForPrisma.__sqMemoryStore.listings.splice(existingIdx, 1);
        }
        globalForPrisma.__sqMemoryStore.listings.unshift(hydrated);
      }
    }
    // Filter out accidental sq_recently_viewed seed items with empty descriptions & cuid prefixes
    globalForPrisma.__sqMemoryStore.listings = globalForPrisma.__sqMemoryStore.listings.filter(
      (l) =>
        !(
          !l.description &&
          (String(l.id).startsWith("cmuf") ||
            String(l.id).startsWith("cmug") ||
            String(l.id).startsWith("cmup"))
        )
    );
  }
  try {
    const candidates = [WORKSPACE_STORE_PATH, DISK_STORE_PATH].filter((p) =>
      fs.existsSync(p)
    );
    if (candidates.length > 0) {
      // Pick candidate with latest mtime or more data
      let bestPath = candidates[0];
      let bestStat = fs.statSync(bestPath);
      for (const p of candidates.slice(1)) {
        const st = fs.statSync(p);
        if (st.mtimeMs > bestStat.mtimeMs) {
          bestPath = p;
          bestStat = st;
        }
      }

      if (!globalForPrisma.__sqStoreMtime || bestStat.mtimeMs > globalForPrisma.__sqStoreMtime) {
        const raw = fs.readFileSync(bestPath, "utf8");
        const parsed = JSON.parse(raw) as Partial<MemoryStore>;
        if (parsed && Array.isArray(parsed.listings)) {
          const initial = createInitialMemoryStore();
          const mergedUsers: Record<string, any> = {
            ...initial.users,
            ...globalForPrisma.__sqMemoryStore.users,
            ...(parsed.users || {}),
          };
          delete mergedUsers["user-cornected-103"];
          mergedUsers["cmvkgvitv0000s62hw5zlq3xi"] = {
            ...DEMO_USERS.cornected,
            ...(mergedUsers["cmvkgvitv0000s62hw5zlq3xi"] || {}),
            phone: mergedUsers["cmvkgvitv0000s62hw5zlq3xi"]?.phone || DEMO_USERS.cornected.phone,
          };

          const hasRealSuitInParsed = parsed.listings.some(
            (item: any) =>
              item &&
              item.id &&
              item.id !== "ad-cornected-suit" &&
              String(item.title || "").toLowerCase().trim() === "hvgfhvjgvgvghv"
          );

          const listingMap = new Map<string, any>();
          for (const item of initial.listings) {
            if (item && item.id === "ad-cornected-suit" && !hasRealSuitInParsed) {
              listingMap.set(item.id, item);
            }
          }
          for (const item of parsed.listings) {
            if (!item || !item.id || item.id === "ad-cornected-suit-2") continue;
            // Skip accidental sq_recently_viewed seed items with empty descriptions
            if (
              !item.description &&
              (String(item.id).startsWith("cmuf") ||
                String(item.id).startsWith("cmug") ||
                String(item.id).startsWith("cmup"))
            ) {
              continue;
            }
            if (item.id === "ad-cornected-suit") {
              if (hasRealSuitInParsed) continue;
              listingMap.set(item.id, {
                ...item,
                sellerId: "cmvkgvitv0000s62hw5zlq3xi",
                seller: mergedUsers["cmvkgvitv0000s62hw5zlq3xi"],
                createdAt: new Date(Date.now() + 120000).toISOString(),
              });
            } else {
              listingMap.set(item.id, item);
            }
          }
          for (const item of globalForPrisma.__sqMemoryStore.listings) {
            if (item && item.id && !listingMap.has(item.id)) {
              if (item.id === "ad-cornected-suit-2") continue;
              if (item.id === "ad-cornected-suit" && hasRealSuitInParsed) continue;
              listingMap.set(item.id, item);
            }
          }
          for (const item of initial.listings) {
            if (item && item.id && !listingMap.has(item.id)) {
              if (item.id === "ad-cornected-suit-2") continue;
              if (item.id === "ad-cornected-suit" && hasRealSuitInParsed) continue;
              const isDemoSeed = String(item.id).startsWith("demo-listing-");
              const hasSameTitle =
                isDemoSeed &&
                Array.from(listingMap.values()).some(
                  (existing) =>
                    existing.id !== item.id &&
                    String(existing.title || "").toLowerCase() === String(item.title || "").toLowerCase()
                );
              if (!hasSameTitle) {
                listingMap.set(item.id, item);
              }
            }
          }

          const mergedListings = Array.from(listingMap.values()).sort(
            (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          );

          globalForPrisma.__sqMemoryStore = {
            ...globalForPrisma.__sqMemoryStore,
            ...parsed,
            users: mergedUsers,
            listings: mergedListings,
          };
          globalForPrisma.__sqStoreMtime = bestStat.mtimeMs;
          saveStoreToDisk(globalForPrisma.__sqMemoryStore);
        }
      }
    } else {
      saveStoreToDisk(globalForPrisma.__sqMemoryStore);
    }
  } catch {
    // ignore
  }
  return globalForPrisma.__sqMemoryStore;
}

let rawPrisma: PrismaClient;
try {
  rawPrisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    });
} catch {
  rawPrisma = new PrismaClient();
}

function hydrateListingRelations(l: any, store: MemoryStore) {
  const directUser = l.sellerId ? store.users[l.sellerId] : null;
  const nestedUser = l.seller?.id ? store.users[l.seller.id] : null;
  const sellerEmail = String(
    directUser?.email || nestedUser?.email || l.seller?.email || ""
  )
    .toLowerCase()
    .trim();
  const emailUser = sellerEmail
    ? Object.values(store.users).find(
        (u: any) => String(u?.email || "").toLowerCase().trim() === sellerEmail
      )
    : null;

  const matchedStoreUser = directUser || nestedUser || emailUser;
  const baseSeller = l.seller || matchedStoreUser || Object.values(store.users)[0];
  const seller = matchedStoreUser
    ? {
        ...baseSeller,
        ...matchedStoreUser,
        id: l.sellerId || matchedStoreUser.id || baseSeller?.id,
        name: matchedStoreUser.name || baseSeller?.name || "Verified Seller",
        email: matchedStoreUser.email || baseSeller?.email || "",
        phone: matchedStoreUser.phone || baseSeller?.phone || "",
        avatarUrl:
          matchedStoreUser.avatarUrl !== undefined
            ? matchedStoreUser.avatarUrl
            : baseSeller?.avatarUrl ?? null,
      }
    : baseSeller;

  const category =
    store.categories.find((c) => c.id === l.categoryId || c.slug === l.categoryId) ||
    l.category ||
    store.categories[0];
  return {
    ...l,
    seller,
    category,
  };
}

function filterStoreListings(args?: any) {
  const store = getStore();
  let list = store.listings.map((l) => hydrateListingRelations(l, store));
  const where = args?.where;

  if (where) {
    if (where.id) {
      if (typeof where.id === "string") {
        list = list.filter((l) => l.id === where.id);
      } else if (Array.isArray(where.id.in)) {
        const idSet = new Set(where.id.in);
        list = list.filter((l) => idSet.has(l.id));
      } else if (where.id.not) {
        list = list.filter((l) => l.id !== where.id.not);
      }
    }
    if (where.NOT?.id) {
      list = list.filter((l) => l.id !== where.NOT.id);
    }
    if (where.status) {
      list = list.filter((l) => l.status === where.status);
    }
    if (where.categoryId) {
      list = list.filter(
        (l) => l.categoryId === where.categoryId || l.category?.slug === where.categoryId
      );
    }
    if (where.category?.slug) {
      list = list.filter((l) => l.category?.slug === where.category.slug);
    }
    if (where.sellerId) {
      const targetUser = store.users[where.sellerId];
      const targetEmail = targetUser?.email ? String(targetUser.email).toLowerCase().trim() : null;
      const targetName = targetUser?.name ? String(targetUser.name).toLowerCase().trim() : null;
      list = list.filter(
        (l) =>
          l.sellerId === where.sellerId ||
          (targetEmail && String(l.seller?.email || "").toLowerCase().trim() === targetEmail) ||
          (targetName && String(l.seller?.name || "").toLowerCase().trim() === targetName)
      );
    }
    if (where.condition) {
      list = list.filter(
        (l) => l.condition.toLowerCase() === String(where.condition).toLowerCase()
      );
    }
    if (where.subcategory) {
      list = list.filter(
        (l) =>
          (l.subcategory && l.subcategory === where.subcategory) ||
          (l.spareDetails && l.spareDetails.includes(where.subcategory))
      );
    }
    if (where.location) {
      const locQuery =
        typeof where.location === "string"
          ? where.location.toLowerCase()
          : (where.location.contains || "").toLowerCase();
      if (locQuery) {
        list = list.filter((l) => l.location.toLowerCase().includes(locQuery));
      }
    }
    if (where.price) {
      if (typeof where.price.gte === "number") {
        list = list.filter((l) => l.price >= where.price.gte);
      }
      if (typeof where.price.lte === "number") {
        list = list.filter((l) => l.price <= where.price.lte);
      }
    }
    if (Array.isArray(where.OR) && where.OR.length > 0) {
      list = list.filter((l) =>
        where.OR.some((cond: any) => {
          if (cond.title?.contains) {
            return l.title.toLowerCase().includes(String(cond.title.contains).toLowerCase());
          }
          if (cond.description?.contains) {
            return l.description
              .toLowerCase()
              .includes(String(cond.description.contains).toLowerCase());
          }
          if (cond.location?.contains) {
            return l.location
              .toLowerCase()
              .includes(String(cond.location.contains).toLowerCase());
          }
          return false;
        })
      );
    }
  }

  const orderBy = args?.orderBy;
  if (orderBy) {
    if (orderBy.price === "asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (orderBy.price === "desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (orderBy.views === "desc") {
      list.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (orderBy.createdAt === "asc") {
      list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  } else {
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  if (args?.take && typeof args.take === "number") {
    list = list.slice(0, args.take);
  }

  return list;
}

const proxyHandler: ProxyHandler<any> = {
  get(target, propKey) {
    const store = getStore();

    if (propKey === "category") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.category.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          return store.categories.map((c) => ({
            ...c,
            _count: {
              listings: store.listings.filter(
                (l) => (l.categoryId === c.id || l.category?.slug === c.slug) && l.status === "ACTIVE"
              ).length,
            },
          }));
        },
        findUnique: async (args: any) => {
          try {
            const res = await target.category.findUnique(args);
            if (res) return res;
          } catch {}
          const where = args?.where || {};
          const found = store.categories.find(
            (c) =>
              (where.slug && c.slug === where.slug) ||
              (where.id && c.id === where.id)
          );
          if (!found) return null;
          const catListings = store.listings
            .filter(
              (l) =>
                (l.categoryId === found.id || l.category?.slug === found.slug) &&
                l.status === "ACTIVE"
            )
            .map((l) => hydrateListingRelations(l, store));
          return {
            ...found,
            listings: catListings,
            _count: { listings: catListings.length },
          };
        },
        findFirst: async (args?: any) => {
          try {
            const res = await target.category.findFirst(args);
            if (res) return res;
          } catch {}
          const where = args?.where || {};
          if (where.slug || where.id) {
            return (
              store.categories.find(
                (c) =>
                  (where.slug && c.slug === where.slug) ||
                  (where.id && c.id === where.id)
              ) || store.categories[0]
            );
          }
          return store.categories[0];
        },
        create: async (args: any) => {
          const newCat: DemoCategory = {
            id: args?.data?.id || `cat-${args?.data?.slug || Date.now()}`,
            name: args?.data?.name || "Category",
            slug: args?.data?.slug || `cat-${Date.now()}`,
            icon: args?.data?.icon || "📦",
            _count: { listings: 0 },
          };
          const existingIdx = store.categories.findIndex((c) => c.slug === newCat.slug || c.id === newCat.id);
          if (existingIdx >= 0) {
            store.categories[existingIdx] = { ...store.categories[existingIdx], ...newCat };
          } else {
            store.categories.push(newCat);
          }
          try {
            return await target.category.create(args);
          } catch {
            return newCat;
          }
        },
        deleteMany: async (args?: any) => {
          try {
            return await target.category.deleteMany(args);
          } catch {
            return { count: 0 };
          }
        },
        count: async () => store.categories.length,
      };
    }

    if (propKey === "listing") {
      return {
        findMany: async (args?: any) => {
          const storeMatches = filterStoreListings(args);
          try {
            const res = await target.listing.findMany(args);
            if (Array.isArray(res) && res.length > 0) {
              const hydratedDb = res.map((r: any) => hydrateListingRelations(r, store));
              const dbByTitle = new Set(
                hydratedDb.map((r: any) => String(r.title || "").toLowerCase().trim())
              );
              // Custom user-posted ads (not in the default SQLite seed) go first so they appear at the top
              const userPostedStoreAds = storeMatches.filter(
                (s: any) =>
                  !hydratedDb.some((d: any) => d.id === s.id) &&
                  (!String(s.id).startsWith("demo-listing-") ||
                    !dbByTitle.has(String(s.title || "").toLowerCase().trim()))
              );
              const seen = new Set([
                ...userPostedStoreAds.map((s: any) => s.id),
                ...hydratedDb.map((r: any) => r.id),
              ]);
              const remainingStore = storeMatches.filter((s: any) => !seen.has(s.id));
              const combined = [...userPostedStoreAds, ...hydratedDb, ...remainingStore];
              if (args?.take && typeof args.take === "number") {
                return combined.slice(0, args.take);
              }
              return combined;
            }
          } catch {}
          return storeMatches;
        },
        findUnique: async (args: any) => {
          const targetId = args?.where?.id;
          const foundInStore = store.listings.find((l) => l.id === targetId);
          try {
            const res = await target.listing.findUnique(args);
            if (res) {
              return hydrateListingRelations(
                foundInStore ? { ...foundInStore, ...res } : res,
                store
              );
            }
          } catch {}
          return foundInStore ? hydrateListingRelations(foundInStore, store) : null;
        },
        findFirst: async (args?: any) => {
          try {
            const res = await target.listing.findFirst(args);
            if (res) return hydrateListingRelations(res, store);
          } catch {}
          const list = filterStoreListings(args);
          return list[0] || null;
        },
        groupBy: async (args?: any) => {
          try {
            const res = await target.listing.groupBy(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          const map: Record<string, number> = {};
          store.listings
            .filter((l) => l.status === "ACTIVE")
            .forEach((l) => {
              const state = l.location.split(",")[0].trim();
              map[state] = (map[state] || 0) + 1;
            });
          return Object.entries(map).map(([location, count]) => ({
            location,
            _count: { _all: count },
          }));
        },
        count: async (args?: any) => {
          const storeLen = filterStoreListings(args).length;
          try {
            const c = await target.listing.count(args);
            if (typeof c === "number" && c > 0) return Math.max(c, storeLen);
          } catch {}
          return storeLen;
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const now = new Date().toISOString();
          const sellerId = data.sellerId || "user-cornelius-admin";

          // If seller info was provided or exists in store, ensure store.users[sellerId] is populated
          if (data.seller && typeof data.seller === "object") {
            store.users[sellerId] = {
              ...(store.users[sellerId] || {}),
              id: sellerId,
              name: data.seller.name || store.users[sellerId]?.name || "Verified Seller",
              email: (data.seller.email || store.users[sellerId]?.email || `seller-${sellerId}@sellquickest.ng`)
                .toLowerCase()
                .trim(),
              phone: data.seller.phone || store.users[sellerId]?.phone || "",
              avatarUrl:
                data.seller.avatarUrl !== undefined
                  ? data.seller.avatarUrl
                  : store.users[sellerId]?.avatarUrl || null,
              createdAt: store.users[sellerId]?.createdAt || now,
            };
          }

          const newListing: DemoListing & Record<string, any> = {
            id: data.id || `ad-${Date.now()}`,
            title: data.title || "Untitled Listing",
            description: data.description || "",
            spareDetails: data.spareDetails ?? null,
            price: Number(data.price) || 0,
            location: data.location || "Lagos",
            condition: data.condition || "Used",
            imageUrl: data.imageUrl || "",
            status: data.status || "ACTIVE",
            views: data.views ?? 1,
            subcategory: data.subcategory ?? null,
            boostTier: data.boostTier ?? null,
            boostExpiresAt: data.boostExpiresAt
              ? new Date(data.boostExpiresAt).toISOString()
              : null,
            createdAt: data.createdAt || now,
            updatedAt: now,
            sellerId,
            categoryId: data.categoryId || "cat-vehicles",
          };
          const hydrated = hydrateListingRelations(newListing, store);
          const existingIdx = store.listings.findIndex((l) => l.id === hydrated.id);
          if (existingIdx >= 0) {
            store.listings[existingIdx] = hydrated;
          } else {
            store.listings.unshift(hydrated);
          }
          saveStoreToDisk(store);

          try {
            // Directly ensure Category & User rows exist in the underlying PostgreSQL DB (bypassing proxy)
            const catId = data.categoryId || "cat-vehicles";
            let realCat = await target.category.findUnique({ where: { id: catId } }).catch(() => null);
            if (!realCat) {
              const fallbackCat =
                store.categories.find((c) => c.id === catId || c.slug === catId) ||
                DEMO_CATEGORIES[0];
              realCat = await target.category
                .upsert({
                  where: { slug: fallbackCat.slug },
                  update: { name: fallbackCat.name, icon: fallbackCat.icon },
                  create: {
                    id: fallbackCat.id,
                    name: fallbackCat.name,
                    slug: fallbackCat.slug,
                    icon: fallbackCat.icon,
                  },
                })
                .catch(() => null);
            }

            let realUser = await target.user.findUnique({ where: { id: sellerId } }).catch(() => null);
            if (!realUser) {
              const memUser = store.users[sellerId];
              const emailToUse = String(
                memUser?.email || `seller-${sellerId}@sellquickest.ng`
              )
                .toLowerCase()
                .trim();
              realUser = await target.user
                .findUnique({ where: { email: emailToUse } })
                .catch(() => null);
              if (!realUser) {
                realUser = await target.user
                  .create({
                    data: {
                      id: sellerId,
                      name: memUser?.name || "Verified Seller",
                      email: emailToUse,
                      phone: memUser?.phone || null,
                      avatarUrl: memUser?.avatarUrl || null,
                      isVerified: true,
                      passwordHash:
                        memUser?.passwordHash ||
                        "$2b$10$q1hoRk4WmG0nO3KT.7ULvOmffgnlzwcBoDB92/gt8Ru1oBidKOWNO",
                    },
                  })
                  .catch(() => null);
              }
            }

            const { seller: _s, category: _c, metadata: _m, negotiable: _n, ...validPrismaData } = data;
            const dbCreated = await target.listing.create({
              ...args,
              data: {
                ...validPrismaData,
                categoryId: realCat?.id || catId,
                sellerId: realUser?.id || sellerId,
              },
            });
            hydrated.id = dbCreated.id;
            saveStoreToDisk(store);
            return hydrateListingRelations({ ...hydrated, ...dbCreated }, store);
          } catch {
            saveStoreToDisk(store);
            return hydrated;
          }
        },
        update: async (args: any) => {
          const targetId = args?.where?.id;
          const data = args?.data || {};
          const idx = store.listings.findIndex((l) => l.id === targetId);
          if (idx >= 0) {
            const current = store.listings[idx];
            const nextViews =
              typeof data.views?.increment === "number"
                ? (current.views || 0) + data.views.increment
                : typeof data.views === "number"
                  ? data.views
                  : current.views;
            const { views: _v, ...restData } = data;
            store.listings[idx] = hydrateListingRelations(
              {
                ...current,
                ...restData,
                views: nextViews,
                updatedAt: new Date().toISOString(),
              },
              store
            );
            saveStoreToDisk(store);
          }

          try {
            return await target.listing.update(args);
          } catch {
            return idx >= 0
              ? store.listings[idx]
              : { id: targetId, ...data };
          }
        },
        delete: async (args: any) => {
          const targetId = args?.where?.id;
          const idx = store.listings.findIndex((l) => l.id === targetId);
          let removed: any = { id: targetId };
          if (idx >= 0) {
            removed = store.listings.splice(idx, 1)[0];
            saveStoreToDisk(store);
          }
          try {
            return await target.listing.delete(args);
          } catch {
            return removed;
          }
        },
        deleteMany: async (args?: any) => {
          try {
            return await target.listing.deleteMany(args);
          } catch {
            return { count: 0 };
          }
        },
      };
    }

    if (propKey === "user") {
      return {
        findUnique: async (args: any) => {
          const id = args?.where?.id;
          const email = (args?.where?.email || "").toLowerCase().trim();

          try {
            const res = await target.user.findUnique(args);
            if (res) {
              store.users[res.id] = {
                ...(store.users[res.id] || {}),
                ...res,
              };
              return res;
            }
          } catch {}

          // Case-insensitive email lookup fallback in SQLite
          if (email) {
            try {
              const allDb = await target.user.findMany();
              const ciMatch = allDb.find(
                (u: any) => String(u.email || "").toLowerCase().trim() === email
              );
              if (ciMatch) {
                store.users[ciMatch.id] = {
                  ...(store.users[ciMatch.id] || {}),
                  ...ciMatch,
                };
                return ciMatch;
              }
            } catch {}
          }

          let matched: DemoUser | null = null;

          if (id && store.users[id]) {
            matched = { ...store.users[id] };
          } else if (email) {
            const found = Object.values(store.users).find(
              (u) =>
                u.email.toLowerCase() === email ||
                (email === "ada@sellquickest.ng" && u.id === "user-ada-101") ||
                (email === "chidi@sellquickest.ng" && u.id === "user-chidi-102")
            );
            if (found) matched = { ...found };
          }

          if (!matched) return null;

          const matchedEmail = String(matched.email || "").toLowerCase().trim();
          const matchedName = String(matched.name || "").toLowerCase().trim();
          const userListings = store.listings.filter(
            (l) =>
              l.sellerId === matched!.id ||
              (matchedEmail &&
                String(l.seller?.email || "").toLowerCase().trim() === matchedEmail) ||
              (matchedName &&
                String(l.seller?.name || "").toLowerCase().trim() === matchedName)
          );
          const result: any = {
            ...matched,
            _count: {
              listings: userListings.length,
            },
          };
          if (args?.include?.listings) {
            result.listings = filterStoreListings({
              where: { sellerId: matched.id },
            });
          }
          return result;
        },
        findFirst: async (args: any) => {
          try {
            const res = await target.user.findFirst(args);
            if (res) return res;
          } catch {}
          const all = Object.values(store.users);
          return all[0] || null;
        },
        findMany: async (args?: any) => {
          const storeUsersList = Object.values(store.users).map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone,
            avatarUrl: u.avatarUrl,
            isVerified: u.isVerified ?? true,
            isBanned: Boolean(u.isBanned),
            createdAt: u.createdAt,
            _count: {
              listings: store.listings.filter(
                (l) =>
                  l.sellerId === u.id ||
                  (u.email &&
                    String(l.seller?.email || "").toLowerCase().trim() ===
                      String(u.email).toLowerCase().trim()) ||
                  (u.name &&
                    String(l.seller?.name || "").toLowerCase().trim() ===
                      String(u.name).toLowerCase().trim())
              ).length,
            },
          }));
          try {
            const res = await target.user.findMany(args);
            if (Array.isArray(res) && res.length > 0) {
              const seen = new Set(res.map((r: any) => r.id));
              const seenEmail = new Set(
                res.map((r: any) => String(r.email || "").toLowerCase().trim())
              );
              const extraStoreUsers = storeUsersList.filter(
                (u) =>
                  !seen.has(u.id) &&
                  !seenEmail.has(String(u.email || "").toLowerCase().trim())
              );
              return [...extraStoreUsers, ...res];
            }
          } catch {}
          return storeUsersList;
        },
        count: async (args?: any) => {
          try {
            const c = await target.user.count(args);
            if (typeof c === "number" && c > 0) return c;
          } catch {}
          return Object.keys(store.users).length;
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const cleanEmail = (data.email || `user-${Date.now()}@sellquickest.ng`)
            .toLowerCase()
            .trim();
          const newUser: DemoUser = {
            id: data.id || `usr-${Date.now()}`,
            name: data.name || "User",
            email: cleanEmail,
            phone: data.phone || "",
            passwordHash: data.passwordHash || "",
            avatarUrl: data.avatarUrl || "",
            createdAt: new Date().toISOString(),
            reviewsWritten: [],
            reviewsReceived: [],
          };
          store.users[newUser.id] = newUser;
          saveStoreToDisk(store);

          try {
            const dbCreated = await target.user.create({
              ...args,
              data: {
                ...data,
                email: cleanEmail,
              },
            });
            delete store.users[newUser.id];
            newUser.id = dbCreated.id;
            store.users[dbCreated.id] = { ...newUser, ...dbCreated };
            saveStoreToDisk(store);
            return dbCreated;
          } catch {
            // If create failed because email already exists in SQLite, update existing row
            try {
              const existingDb = await target.user.findUnique({
                where: { email: cleanEmail },
              });
              if (existingDb) {
                const updatedDb = await target.user.update({
                  where: { id: existingDb.id },
                  data: {
                    name: data.name || existingDb.name,
                    phone: data.phone ?? existingDb.phone,
                    passwordHash: data.passwordHash || existingDb.passwordHash,
                  },
                });
                delete store.users[newUser.id];
                store.users[updatedDb.id] = { ...newUser, ...updatedDb };
                saveStoreToDisk(store);
                return updatedDb;
              }
            } catch {}
            return newUser;
          }
        },
        update: async (args: any) => {
          const id = args?.where?.id;
          const email = args?.where?.email || args?.data?.email;
          const data = args?.data || {};
          const cleanEmail = email ? String(email).toLowerCase().trim() : "";

          // 1. Upsert in store.users by id and/or email so avatarUrl & profile changes always persist
          let targetKey = id;
          if (!targetKey && cleanEmail) {
            const byEmail = Object.values(store.users).find(
              (u: any) => String(u?.email || "").toLowerCase().trim() === cleanEmail
            );
            if (byEmail) targetKey = byEmail.id;
          }

          if (targetKey) {
            const existing =
              store.users[targetKey] ||
              (cleanEmail
                ? Object.values(store.users).find(
                    (u: any) => String(u?.email || "").toLowerCase().trim() === cleanEmail
                  )
                : null);

            store.users[targetKey] = {
              id: targetKey,
              name: existing?.name || data.name || "SellQuickest Member",
              email: cleanEmail || existing?.email || `user-${targetKey}@sellquickest.ng`,
              phone: existing?.phone || data.phone || "",
              passwordHash:
                existing?.passwordHash ||
                "$2b$10$q1hoRk4WmG0nO3KT.7ULvOmffgnlzwcBoDB92/gt8Ru1oBidKOWNO",
              avatarUrl: existing?.avatarUrl || null,
              createdAt: existing?.createdAt || new Date().toISOString(),
              reviewsWritten: existing?.reviewsWritten || [],
              reviewsReceived: existing?.reviewsReceived || [],
              ...(existing || {}),
              ...data,
            };

            // Also sync any other user entry with the same email
            const resolvedEmail = String(store.users[targetKey].email || "")
              .toLowerCase()
              .trim();
            if (resolvedEmail) {
              for (const [k, u] of Object.entries(store.users)) {
                if (
                  k !== targetKey &&
                  String((u as any)?.email || "").toLowerCase().trim() === resolvedEmail
                ) {
                  store.users[k] = {
                    ...u,
                    ...data,
                  };
                }
              }
            }

            // Refresh seller snapshots across all listings in store.listings
            store.listings = store.listings.map((l) =>
              hydrateListingRelations(l, store)
            );
            saveStoreToDisk(store);
          }

          try {
            const updated = await target.user.update(args);
            if (updated?.id) {
              store.users[updated.id] = {
                ...(store.users[updated.id] || {}),
                ...updated,
              };
              store.listings = store.listings.map((l) =>
                hydrateListingRelations(l, store)
              );
              saveStoreToDisk(store);
            }
            return updated;
          } catch {
            if (targetKey && store.users[targetKey]) {
              return store.users[targetKey];
            }
            return { id, ...data };
          }
        },
        delete: async (args: any) => {
          const id = args?.where?.id;
          if (id && store.users[id]) {
            delete store.users[id];
          }
          try {
            return await target.user.delete(args);
          } catch {
            return { id };
          }
        },
        deleteMany: async (args?: any) => {
          try {
            return await target.user.deleteMany(args);
          } catch {
            return { count: 0 };
          }
        },
      };
    }

    if (propKey === "adReport") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.adReport.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          return [...store.adReports].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const matchedListing =
            store.listings.find((l) => l.id === data.listingId) || store.listings[0];
          const matchedReporter = data.reporterId ? store.users[data.reporterId] : null;
          const newReport = {
            id: data.id || `rep-${Date.now()}`,
            reason: data.reason || "Reported Listing",
            details: data.details || "",
            status: data.status || "PENDING",
            createdAt: new Date().toISOString(),
            listingId: matchedListing.id,
            reporterId: matchedReporter?.id || null,
            listing: {
              id: matchedListing.id,
              title: matchedListing.title,
              price: matchedListing.price,
              status: matchedListing.status,
              imageUrl: matchedListing.imageUrl,
              seller: matchedListing.seller || {
                id: matchedListing.sellerId,
                name: "Seller",
                email: "seller@sellquickest.ng",
              },
            },
            reporter: matchedReporter
              ? { id: matchedReporter.id, name: matchedReporter.name, email: matchedReporter.email }
              : { id: "guest", name: "Community Reporter", email: "reporter@sellquickest.ng" },
          };
          store.adReports.unshift(newReport);
          try {
            return await target.adReport.create({
              data: {
                reason: newReport.reason,
                details: newReport.details,
                status: newReport.status,
                listingId: newReport.listingId,
                ...(matchedReporter ? { reporterId: matchedReporter.id } : {}),
              },
            });
          } catch {
            return newReport;
          }
        },
        update: async (args: any) => {
          const id = args?.where?.id;
          const data = args?.data || {};
          const idx = store.adReports.findIndex((r) => r.id === id);
          if (idx >= 0) {
            store.adReports[idx] = { ...store.adReports[idx], ...data };
          }
          try {
            return await target.adReport.update(args);
          } catch {
            return idx >= 0 ? store.adReports[idx] : { id, ...data };
          }
        },
        count: async (args?: any) => {
          try {
            return await target.adReport.count(args);
          } catch {
            if (args?.where?.status) {
              return store.adReports.filter((r) => r.status === args.where.status).length;
            }
            return store.adReports.length;
          }
        },
      };
    }

    if (propKey === "review") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.review.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          let list = [...store.reviews];
          if (args?.where?.sellerId) {
            list = list.filter((r) => r.sellerId === args.where.sellerId);
          }
          return list.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const buyer = store.users[data.buyerId] || Object.values(store.users)[0];
          const newRev = {
            id: `rev-${Date.now()}`,
            rating: Number(data.rating) || 5,
            comment: data.comment || "",
            createdAt: new Date().toISOString(),
            buyerId: data.buyerId || buyer.id,
            sellerId: data.sellerId || "user-ada-101",
            listingId: data.listingId || null,
            buyer: { id: buyer.id, name: data.reviewerName || buyer.name },
            reviewerName: data.reviewerName || buyer.name,
          };
          store.reviews.unshift(newRev);
          try {
            const { reviewerName: _rn, ...prismaData } = data;
            return await target.review.create({ data: prismaData });
          } catch {
            return newRev;
          }
        },
        count: async (args?: any) => {
          try {
            return await target.review.count(args);
          } catch {
            return store.reviews.length;
          }
        },
      };
    }

    if (propKey === "message") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.message.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          let list = [...store.messages];
          if (args?.where?.listingId) {
            list = list.filter((m) => m.listingId === args.where.listingId);
          }
          if (args?.where?.receiverId) {
            list = list.filter((m) => m.receiverId === args.where.receiverId);
          }
          if (Array.isArray(args?.where?.OR)) {
            list = list.filter((m) =>
              args.where.OR.some(
                (c: any) =>
                  (c.senderId && m.senderId === c.senderId) ||
                  (c.receiverId && m.receiverId === c.receiverId)
              )
            );
          }
          if (args?.include?.listing) {
            list = list.map((m) => ({
              ...m,
              listing: hydrateListingRelations(
                store.listings.find((l) => l.id === m.listingId) || store.listings[0],
                store
              ),
            }));
          }
          return list;
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const msg = {
            id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            text: data.text || "",
            imageUrl: data.imageUrl || null,
            offerJson: data.offerJson || null,
            read: Boolean(data.read),
            createdAt: new Date().toISOString(),
            senderId: data.senderId,
            receiverId: data.receiverId,
            listingId: data.listingId,
          };
          store.messages.push(msg);
          try {
            const dbCreated = await target.message.create(args);
            msg.id = dbCreated.id;
            return dbCreated;
          } catch {
            return msg;
          }
        },
        update: async (args: any) => {
          const id = args?.where?.id;
          const idx = store.messages.findIndex((m) => m.id === id);
          if (idx >= 0) {
            store.messages[idx] = { ...store.messages[idx], ...args.data };
          }
          try {
            return await target.message.update(args);
          } catch {
            return idx >= 0 ? store.messages[idx] : { id, ...args.data };
          }
        },
        count: async (args?: any) => {
          try {
            return await target.message.count(args);
          } catch {
            let list = store.messages;
            if (args?.where?.receiverId) {
              list = list.filter((m) => m.receiverId === args.where.receiverId);
            }
            if (typeof args?.where?.read === "boolean") {
              list = list.filter((m) => m.read === args.where.read);
            }
            return list.length;
          }
        },
      };
    }

    if (propKey === "notification") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.notification.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          let list = [...store.notifications];
          if (args?.where?.userId) {
            list = list.filter((n) => n.userId === args.where.userId);
          }
          return list.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const notif = {
            id: data.id || `notif-${Date.now()}`,
            title: data.title || "Notification",
            text: data.text || "",
            type: data.type || "info",
            listingId: data.listingId || null,
            listingTitle: data.listingTitle || null,
            read: Boolean(data.read),
            createdAt: new Date().toISOString(),
            userId: data.userId || "user-ada-101",
          };
          store.notifications.unshift(notif);
          try {
            return await target.notification.create(args);
          } catch {
            return notif;
          }
        },
        updateMany: async (args?: any) => {
          const userId = args?.where?.userId;
          store.notifications.forEach((n) => {
            if (!userId || n.userId === userId) {
              if (args?.data?.read !== undefined) n.read = args.data.read;
            }
          });
          try {
            return await target.notification.updateMany(args);
          } catch {
            return { count: store.notifications.length };
          }
        },
        deleteMany: async (args?: any) => {
          const userId = args?.where?.userId;
          if (userId) {
            store.notifications = store.notifications.filter((n) => n.userId !== userId);
          } else {
            store.notifications = [];
          }
          try {
            return await target.notification.deleteMany(args);
          } catch {
            return { count: 1 };
          }
        },
        count: async (args?: any) => {
          try {
            return await target.notification.count(args);
          } catch {
            let list = store.notifications;
            if (args?.where?.userId) {
              list = list.filter((n) => n.userId === args.where.userId);
            }
            if (typeof args?.where?.read === "boolean") {
              list = list.filter((n) => n.read === args.where.read);
            }
            return list.length;
          }
        },
      };
    }

    if (propKey === "savedListing") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.savedListing.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          let list = [...store.savedListings];
          if (args?.where?.userId) {
            list = list.filter((s) => s.userId === args.where.userId);
          }
          return list.map((s) => ({
            ...s,
            listing: hydrateListingRelations(
              store.listings.find((l) => l.id === s.listingId) || store.listings[0],
              store
            ),
          }));
        },
        findUnique: async (args: any) => {
          try {
            const res = await target.savedListing.findUnique(args);
            if (res) return res;
          } catch {}
          const uk = args?.where?.userId_listingId;
          if (uk) {
            return (
              store.savedListings.find(
                (s) => s.userId === uk.userId && s.listingId === uk.listingId
              ) || null
            );
          }
          return null;
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const item = {
            id: `saved-${Date.now()}`,
            userId: data.userId,
            listingId: data.listingId,
            createdAt: new Date().toISOString(),
          };
          const exists = store.savedListings.some(
            (s) => s.userId === item.userId && s.listingId === item.listingId
          );
          if (!exists) {
            store.savedListings.unshift(item);
          }
          try {
            return await target.savedListing.create(args);
          } catch {
            return item;
          }
        },
        deleteMany: async (args?: any) => {
          const where = args?.where || {};
          store.savedListings = store.savedListings.filter((s) => {
            if (where.userId && where.listingId) {
              return !(s.userId === where.userId && s.listingId === where.listingId);
            }
            if (where.userId) {
              return s.userId !== where.userId;
            }
            return false;
          });
          try {
            return await target.savedListing.deleteMany(args);
          } catch {
            return { count: 1 };
          }
        },
      };
    }

    if (propKey === "supportTicket") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.supportTicket.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          return [...store.supportTickets];
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const ticket = {
            id: `tkt-${Date.now()}`,
            name: data.name || "Visitor",
            email: data.email || "",
            phone: data.phone || null,
            subject: data.subject || "General Inquiry",
            message: data.message || "",
            status: data.status || "OPEN",
            createdAt: new Date().toISOString(),
          };
          store.supportTickets.unshift(ticket);
          try {
            return await target.supportTicket.create(args);
          } catch {
            return ticket;
          }
        },
        update: async (args: any) => {
          const id = args?.where?.id;
          const idx = store.supportTickets.findIndex((t) => t.id === id);
          if (idx >= 0) {
            store.supportTickets[idx] = { ...store.supportTickets[idx], ...args.data };
          }
          try {
            return await target.supportTicket.update(args);
          } catch {
            return idx >= 0 ? store.supportTickets[idx] : { id, ...args.data };
          }
        },
        count: async () => store.supportTickets.length,
      };
    }

    if (propKey === "kycVerification") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.kycVerification.findMany(args);
            if (Array.isArray(res) && res.length > 0) {
              return res.map((k: any) => ({
                ...k,
                user: k.user || store.users[k.userId] || Object.values(store.users)[0],
              }));
            }
          } catch {}
          let list = [...store.kycVerifications];
          if (args?.where?.userId) {
            list = list.filter((k) => k.userId === args.where.userId);
          }
          return list.map((k) => ({
            ...k,
            user: k.user || store.users[k.userId] || Object.values(store.users)[0],
          }));
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const user = store.users[data.userId] || Object.values(store.users)[0];
          const item = {
            id: `kyc-${Date.now()}`,
            businessName: data.businessName || user.name,
            documentType: data.documentType || "NIN",
            documentNumber: data.documentNumber || "",
            documentUrl: data.documentUrl || null,
            status: data.status || "PENDING",
            createdAt: new Date().toISOString(),
            userId: data.userId || user.id,
            user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
          };
          store.kycVerifications.unshift(item);
          try {
            return await target.kycVerification.create(args);
          } catch {
            return item;
          }
        },
        update: async (args: any) => {
          const id = args?.where?.id;
          const idx = store.kycVerifications.findIndex((k) => k.id === id);
          if (idx >= 0) {
            store.kycVerifications[idx] = { ...store.kycVerifications[idx], ...args.data };
          }
          try {
            return await target.kycVerification.update(args);
          } catch {
            return idx >= 0 ? store.kycVerifications[idx] : { id, ...args.data };
          }
        },
        count: async () => store.kycVerifications.length,
      };
    }

    if (propKey === "paymentTransaction") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.paymentTransaction.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          let list = [...store.paymentTransactions];
          if (args?.where?.userId) {
            list = list.filter((t) => t.userId === args.where.userId);
          }
          return list;
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const tx = {
            id: `tx-${Date.now()}`,
            reference: data.reference || `SQ-PAY-${Date.now()}`,
            planName: data.planName || "TOP AD",
            amount: Number(data.amount) || 0,
            gateway: data.gateway || "PAYSTACK",
            status: data.status || "SUCCESS",
            listingId: data.listingId || null,
            userId: data.userId || "user-ada-101",
            createdAt: new Date().toISOString(),
          };
          store.paymentTransactions.unshift(tx);
          try {
            return await target.paymentTransaction.create(args);
          } catch {
            return tx;
          }
        },
        count: async () => store.paymentTransactions.length,
      };
    }

    return target[propKey];
  },
};

export const prisma = new Proxy(rawPrisma, proxyHandler);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = rawPrisma;
}
