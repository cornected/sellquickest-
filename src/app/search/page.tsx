import { ListingCard } from "@/components/ListingCard";
import { SearchBar } from "@/components/SearchBar";
import { prisma } from "@/lib/db";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string }>;
}) {
  const { q = "", location: rawLocation = "" } = await searchParams;
  const location = !rawLocation || rawLocation === "All Nigeria" ? "" : rawLocation;

  const listings = await prisma.listing.findMany({
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

  return (
    <main className="container py-4">
      <SearchBar defaultQuery={q} defaultLocation={location || "All Nigeria"} />
      <h1 className="h3 fw-bold mt-4">
        {q ? `Results for “${q}”` : "All ads"}
        {location ? ` in ${location}` : ""}
      </h1>
      <p className="text-secondary">{listings.length} ads found</p>
      {listings.length === 0 ? (
        <p className="text-secondary">Nothing matched. Try a shorter search or another city.</p>
      ) : (
        <div className="row g-3">
          {listings.map((listing) => (
            <div key={listing.id} className="col-6 col-md-4 col-lg-3">
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
