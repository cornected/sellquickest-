import Link from "next/link";
import { SavedAdsClient } from "./SavedAdsClient";

export default function SavedAdsPage() {
  return (
    <main className="container py-4" style={{ maxWidth: "1000px" }}>
      {/* BREADCRUMB */}
      <nav aria-label="breadcrumb" className="mb-2">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Saved Ads
          </li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Liked & Saved Ads</h1>
          <p className="text-secondary small mb-0">
            Keep track of items you are interested in buying across SellQuickest
          </p>
        </div>
        <Link href="/" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
          Explore More
        </Link>
      </div>

      <SavedAdsClient />
    </main>
  );
}
