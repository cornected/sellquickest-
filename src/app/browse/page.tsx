import Link from "next/link";
import type { Metadata } from "next";
import { SearchBar } from "@/components/SearchBar";
import { AllAdsListingView } from "@/components/AllAdsListingView";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Browse All Classified Ads — SellQuickest Nigeria",
  description:
    "Explore thousands of active classified listings across Nigeria. Filter by category, location, and price on SellQuickest.",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    condition?: string;
    sort?: string;
  }>;
}) {
  const resolved = await searchParams;
  const { q = "", location: rawLocation = "" } = resolved;
  const location = !rawLocation || rawLocation === "All Nigeria" ? "" : rawLocation;

  const minPriceNum = resolved.minPrice ? parseInt(resolved.minPrice, 10) : undefined;
  const maxPriceNum = resolved.maxPrice ? parseInt(resolved.maxPrice, 10) : undefined;
  const conditionFilter = resolved.condition;
  const sortOption = resolved.sort;

  let listings = await prisma.listing.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        location ? { location: { contains: location, mode: "insensitive" } } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  // Price filters
  if (minPriceNum !== undefined && !isNaN(minPriceNum)) {
    listings = listings.filter((l) => l.price >= minPriceNum);
  }
  if (maxPriceNum !== undefined && !isNaN(maxPriceNum)) {
    listings = listings.filter((l) => l.price <= maxPriceNum);
  }

  // Condition filter
  if (conditionFilter && conditionFilter !== "all") {
    listings = listings.filter((l) => {
      const cond = (l.condition || "").toLowerCase();
      if (conditionFilter === "brand_new") return cond.includes("new");
      if (conditionFilter === "foreign_used")
        return cond.includes("foreign") || cond.includes("tokunbo");
      if (conditionFilter === "local_used")
        return cond.includes("local") || cond.includes("nigerian");
      return true;
    });
  }

  // Sort
  if (sortOption === "price_asc") {
    listings = [...listings].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price_desc") {
    listings = [...listings].sort((a, b) => b.price - a.price);
  } else {
    listings = [...listings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return (
    <main className="container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Browse All Ads
          </li>
        </ol>
      </nav>

      <SearchBar defaultQuery={q} defaultLocation={location || "All Nigeria"} />

      <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 mb-3">
        <div>
          <h1 className="h4 fw-bold text-dark mb-0">Browse All Classifieds</h1>
          <p className="text-secondary small mb-0">
            Showing {listings.length} active listings across Nigeria
          </p>
        </div>
      </div>

      <AllAdsListingView listings={listings} basePath="/browse" />
    </main>
  );
}
