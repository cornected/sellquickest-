import { notFound } from "next/navigation";
import { ListingCard } from "@/components/ListingCard";
import { prisma } from "@/lib/db";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { listings: { orderBy: { createdAt: "desc" } } },
  });
  if (!category) notFound();

  return (
    <main className="container py-4">
      <p className="text-secondary small mb-1">
        Home / {category.icon} {category.name}
      </p>
      <h1 className="h3 fw-bold">
        {category.name}{" "}
        <span className="fs-6 fw-normal text-secondary">({category.listings.length} ads)</span>
      </h1>
      {category.listings.length === 0 ? (
        <p className="text-secondary mt-4">No ads in this category yet.</p>
      ) : (
        <div className="row g-3 mt-2">
          {category.listings.map((listing) => (
            <div key={listing.id} className="col-6 col-md-4 col-lg-3">
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
