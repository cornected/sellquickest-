import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DEMO_LISTINGS } from "@/lib/demoData";
import { MyAdsAuthGuard } from "@/components/MyAdsAuthGuard";

export const dynamic = "force-dynamic";

export default async function MyAdsPage() {
  const user = await getSession();

  let listings: any[] = [];
  try {
    if (user?.id) {
      listings = await prisma.listing.findMany({
        where: { sellerId: user.id },
        orderBy: { createdAt: "desc" },
      });
    } else {
      listings = await prisma.listing.findMany({
        where: { sellerId: "cmvkgvitv0000s62hw5zlq3xi" },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch {
    listings = DEMO_LISTINGS.filter((l) => l.sellerId === "cmvkgvitv0000s62hw5zlq3xi");
  }

  return (
    <main className="container py-4 pb-5">
      {/* BREADCRUMB */}
      <nav aria-label="breadcrumb" className="mb-2">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            My Ads
          </li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">My Advertisements</h1>
          <p className="text-secondary small mb-0">
            Manage your listings, track views, mark items as sold, or edit your ads
          </p>
        </div>
        <Link href="/post" className="btn btn-sq text-white fw-bold px-4 py-2 rounded-pill shadow-sm">
          + Post New Ad
        </Link>
      </div>

      <MyAdsAuthGuard serverUser={user} initialListings={listings} />
    </main>
  );
}
