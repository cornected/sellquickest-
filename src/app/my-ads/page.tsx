import Link from "next/link";
import { redirect } from "next/navigation";
import { ListingCard } from "@/components/ListingCard";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function MyAdsPage() {
  const user = await getSession();
  if (!user) redirect("/login?next=/my-ads");
  const listings = await prisma.listing.findMany({
    where: { sellerId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="h3 fw-bold mb-0">My ads</h1>
        <Link href="/post" className="btn btn-sq text-white fw-bold">
          Post new
        </Link>
      </div>
      {listings.length === 0 ? (
        <p className="text-secondary mt-4">You have not posted any ads yet.</p>
      ) : (
        <div className="row g-3 mt-3">
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
