import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { EditAdForm } from "@/components/EditAdForm";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSession();
  if (!user) {
    const { id } = await params;
    redirect(`/login?next=/listing/${id}/edit`);
  }

  const { id } = await params;

  const [listing, categories] = await Promise.all([
    prisma.listing.findUnique({
      where: { id },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!listing) notFound();

  // Ensure only the listing owner can edit
  if (listing.sellerId !== user.id) {
    redirect(`/listing/${id}`);
  }

  return (
    <main className="container py-4 min-vh-100" style={{ maxWidth: "1000px" }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/my-ads" className="text-decoration-none text-secondary">
              My Ads
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Edit Ad
          </li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Edit Advertisement</h1>
          <p className="text-secondary small mb-0">
            Update your item details, price, condition, or photos.
          </p>
        </div>

        <Link
          href={`/listing/${listing.id}`}
          className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1.5"
        >
          ← Back to Ad
        </Link>
      </div>

      <EditAdForm listing={listing} categories={categories} />
    </main>
  );
}
