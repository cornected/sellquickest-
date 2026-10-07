import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { NIGERIA_LOCATIONS } from "@/lib/nigeriaLocations";

export const metadata: Metadata = {
  title: "Browse Ads by State & Location — SellQuickest Nigeria",
  description:
    "Find local classifieds across all 36 Nigerian states and Abuja FCT: Lagos, Abuja, Rivers, Oyo, Kano, Kaduna, Ogun, Enugu, and more.",
};

export default async function LocationsPage() {
  const listingsByLocation = await prisma.listing.groupBy({
    by: ["location"],
    _count: { _all: true },
  });

  const countMap: Record<string, number> = {};
  listingsByLocation.forEach((item) => {
    if (item.location) {
      countMap[item.location.toLowerCase()] = item._count._all;
    }
  });

  const states = Object.keys(NIGERIA_LOCATIONS).sort();

  return (
    <main className="container py-4 pb-5" style={{ maxWidth: "1080px" }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Locations Directory
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white text-center">
        <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-1.5 rounded-pill mx-auto mb-2">
          HYPERLOCAL NIGERIA
        </span>
        <h1 className="fw-bold text-dark mb-2">Explore Ads Across Nigeria</h1>
        <p className="lead text-secondary mx-auto mb-0" style={{ maxWidth: "620px" }}>
          Buy and sell items within your state, city, or neighborhood to save on delivery fees and transact in person safely.
        </p>
      </div>

      {/* States Grid */}
      <div className="row g-3">
        {states.map((stateName) => {
          let count = 0;
          Object.keys(countMap).forEach((loc) => {
            if (loc.includes(stateName.toLowerCase())) {
              count += countMap[loc];
            }
          });

          return (
            <div key={stateName} className="col-6 col-sm-4 col-md-3">
              <Link
                href={`/search?location=${encodeURIComponent(stateName)}`}
                className="text-decoration-none"
              >
                <div className="card border-0 rounded-4 shadow-sm p-3 bg-white h-100 transition-all hover-shadow">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h2 className="h6 fw-bold text-dark mb-0">{stateName}</h2>
                      <span className="text-secondary small">
                        {count > 0 ? `${count} active ads` : "Browse ads"}
                      </span>
                    </div>
                    <span className="text-muted small">›</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
