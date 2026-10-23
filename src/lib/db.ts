import { PrismaClient } from "@prisma/client";
import { DEMO_CATEGORIES, DEMO_LISTINGS, DEMO_USERS, DemoCategory, DemoListing, DemoUser } from "@/lib/demoData";

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
};

function createInitialMemoryStore(): MemoryStore {
  const usersCopy: Record<string, any> = {
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

function getStore(): MemoryStore {
  if (!globalForPrisma.__sqMemoryStore) {
    globalForPrisma.__sqMemoryStore = createInitialMemoryStore();
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
  const seller = store.users[l.sellerId] || l.seller || Object.values(store.users)[0];
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
      list = list.filter((l) => l.sellerId === where.sellerId);
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
          return (
            store.categories.find(
              (c) =>
                (where.slug && c.slug === where.slug) ||
                (where.id && c.id === where.id)
            ) || null
          );
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
          try {
            const res = await target.listing.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          return filterStoreListings(args);
        },
        findUnique: async (args: any) => {
          try {
            const res = await target.listing.findUnique(args);
            if (res) return res;
          } catch {}
          const targetId = args?.where?.id;
          const found = store.listings.find((l) => l.id === targetId);
          return found ? hydrateListingRelations(found, store) : null;
        },
        findFirst: async (args?: any) => {
          try {
            const res = await target.listing.findFirst(args);
            if (res) return res;
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
          try {
            const c = await target.listing.count(args);
            if (typeof c === "number" && c > 0) return c;
          } catch {}
          return filterStoreListings(args).length;
        },
        create: async (args: any) => {
          const data = args?.data || {};
          const now = new Date().toISOString();
          const newListing: DemoListing = {
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
            boostTier: data.boostTier ?? null,
            boostExpiresAt: data.boostExpiresAt
              ? new Date(data.boostExpiresAt).toISOString()
              : null,
            createdAt: now,
            updatedAt: now,
            sellerId: data.sellerId || "user-ada-101",
            categoryId: data.categoryId || "cat-vehicles",
          };
          const hydrated = hydrateListingRelations(newListing, store);
          store.listings.unshift(hydrated);

          try {
            const dbCreated = await target.listing.create(args);
            hydrated.id = dbCreated.id;
            return dbCreated;
          } catch {
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

          const result: any = {
            ...matched,
            _count: {
              listings: store.listings.filter((l) => l.sellerId === matched!.id).length,
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
          try {
            const res = await target.user.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch {}
          return Object.values(store.users).map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone,
            avatarUrl: u.avatarUrl,
            createdAt: u.createdAt,
            _count: {
              listings: store.listings.filter((l) => l.sellerId === u.id).length,
            },
          }));
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
                return updatedDb;
              }
            } catch {}
            return newUser;
          }
        },
        update: async (args: any) => {
          const id = args?.where?.id;
          const email = args?.where?.email;
          const data = args?.data || {};
          if (id && store.users[id]) {
            store.users[id] = {
              ...store.users[id],
              ...data,
            };
          }
          try {
            const updated = await target.user.update(args);
            if (updated?.id) {
              store.users[updated.id] = {
                ...(store.users[updated.id] || {}),
                ...updated,
              };
            }
            return updated;
          } catch {
            if (email) {
              const found = Object.values(store.users).find(
                (u) => u.email.toLowerCase() === String(email).toLowerCase()
              );
              if (found) {
                store.users[found.id] = { ...found, ...data };
                return store.users[found.id];
              }
            }
            return id && store.users[id]
              ? store.users[id]
              : { id, ...data };
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
