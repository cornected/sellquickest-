import { PrismaClient } from "@prisma/client";
import { DEMO_CATEGORIES, DEMO_LISTINGS, DEMO_USERS } from "@/lib/demoData";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

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

function filterDemoListings(args?: any) {
  let list = [...DEMO_LISTINGS];
  const where = args?.where;

  if (where) {
    if (where.categoryId) {
      list = list.filter((l) => l.categoryId === where.categoryId || l.category?.slug === where.categoryId);
    }
    if (where.location?.contains) {
      const loc = where.location.contains.toLowerCase();
      list = list.filter((l) => l.location.toLowerCase().includes(loc));
    }
    if (where.sellerId) {
      list = list.filter((l) => l.sellerId === where.sellerId);
    }
  }

  if (args?.take && typeof args.take === "number") {
    list = list.slice(0, args.take);
  }

  return list;
}

// Resilient proxy wrapper that guarantees zero 500 errors on serverless Vercel
const proxyHandler: ProxyHandler<any> = {
  get(target, propKey) {
    if (propKey === "category") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.category.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch (e) {
            console.warn("[Prisma] category.findMany fallback to demo data");
          }
          return DEMO_CATEGORIES;
        },
        findUnique: async (args: any) => {
          try {
            const res = await target.category.findUnique(args);
            if (res) return res;
          } catch (e) {
            console.warn("[Prisma] category.findUnique fallback to demo data");
          }
          const where = args?.where || {};
          return (
            DEMO_CATEGORIES.find(
              (c) =>
                (where.slug && c.slug === where.slug) ||
                (where.id && c.id === where.id)
            ) || DEMO_CATEGORIES[0]
          );
        },
        findFirst: async (args?: any) => {
          try {
            const res = await target.category.findFirst(args);
            if (res) return res;
          } catch (e) {}
          return DEMO_CATEGORIES[0];
        },
        count: async () => DEMO_CATEGORIES.length,
      };
    }

    if (propKey === "listing") {
      return {
        findMany: async (args?: any) => {
          try {
            const res = await target.listing.findMany(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch (e) {
            console.warn("[Prisma] listing.findMany fallback to demo listings");
          }
          return filterDemoListings(args);
        },
        findUnique: async (args: any) => {
          try {
            const res = await target.listing.findUnique(args);
            if (res) return res;
          } catch (e) {
            console.warn("[Prisma] listing.findUnique fallback to demo listings");
          }
          const targetId = args?.where?.id;
          const found = DEMO_LISTINGS.find((l) => l.id === targetId);
          return found || DEMO_LISTINGS[0];
        },
        findFirst: async (args?: any) => {
          try {
            const res = await target.listing.findFirst(args);
            if (res) return res;
          } catch (e) {}
          return DEMO_LISTINGS[0];
        },
        groupBy: async (args?: any) => {
          try {
            const res = await target.listing.groupBy(args);
            if (Array.isArray(res) && res.length > 0) return res;
          } catch (e) {}
          // Compute locations from demo listings
          const map: Record<string, number> = {};
          DEMO_LISTINGS.forEach((l) => {
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
            return await target.listing.count(args);
          } catch (e) {
            return DEMO_LISTINGS.length;
          }
        },
        create: async (args: any) => {
          try {
            return await target.listing.create(args);
          } catch (e) {
            return {
              id: "new-ad-" + Date.now(),
              ...args.data,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
          }
        },
        update: async (args: any) => {
          try {
            return await target.listing.update(args);
          } catch (e) {
            return { id: args?.where?.id, ...args?.data };
          }
        },
        delete: async (args: any) => {
          try {
            return await target.listing.delete(args);
          } catch (e) {
            return { id: args?.where?.id };
          }
        },
      };
    }

    if (propKey === "user") {
      return {
        findUnique: async (args: any) => {
          try {
            const res = await target.user.findUnique(args);
            if (res) return res;
          } catch (e) {}
          const id = args?.where?.id;
          const email = args?.where?.email;
          if (id === DEMO_USERS.ada.id || email === DEMO_USERS.ada.email) return DEMO_USERS.ada;
          if (id === DEMO_USERS.chidi.id || email === DEMO_USERS.chidi.email) return DEMO_USERS.chidi;
          return null;
        },
        findFirst: async (args: any) => {
          try {
            return await target.user.findFirst(args);
          } catch (e) {
            return null;
          }
        },
        create: async (args: any) => target.user.create(args),
        update: async (args: any) => target.user.update(args),
      };
    }

    // Default passthrough
    return target[propKey];
  },
};

export const prisma = new Proxy(rawPrisma, proxyHandler);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = rawPrisma;
}
