import { SearchBar } from "@/components/SearchBar";
import { AllAdsListingView } from "@/components/AllAdsListingView";
import { prisma } from "@/lib/db";

export default async function SearchPage({
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
                { title: { contains: q } },
                { description: { contains: q } },
              ],
            }
          : {},
        location ? { location: { contains: location } } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  // Price range filters
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

  // Sorting
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
      <SearchBar defaultQuery={q} defaultLocation={location || "All Nigeria"} />

      <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 mb-3">
        <div>
          <h1 className="h4 fw-bold mb-0">
            {q ? `Search results for “${q}”` : "All ads"}
            {location ? ` in ${location}` : ""}
          </h1>
          <p className="text-secondary small mb-0">{listings.length} ads found</p>
        </div>
      </div>

      <AllAdsListingView listings={listings} basePath="/search" />
    </main>
  );
}
