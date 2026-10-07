import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Success Guide — SellQuickest Nigeria",
  description:
    "Expert tips on how to sell faster on SellQuickest. Learn how to take high-converting photos, price competitively, and close deals safely.",
};

export default function SellerGuidePage() {
  return (
    <main className="container py-4 pb-5" style={{ maxWidth: "920px" }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Seller Guide
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 mb-4 bg-white text-center">
        <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-1.5 rounded-pill mx-auto mb-2">
          SELLER PLAYBOOK
        </span>
        <h1 className="h2 fw-bold text-dark mb-2">How to Sell 3x Faster on SellQuickest</h1>
        <p className="text-secondary mx-auto mb-0" style={{ maxWidth: "600px" }}>
          Simple, proven strategies used by our top merchants to attract genuine buyers and close sales quickly.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
            <div className="fs-1 mb-2">📸</div>
            <h2 className="h5 fw-bold text-dark mb-2">1. Use Clear, Daylight Photos</h2>
            <p className="text-secondary small mb-0" style={{ lineHeight: "1.7" }}>
              Buyers scroll past blurry or stock catalog photos. Take 4–8 original pictures in good daylight showing front, back, accessories, and any minor wear or scratches. Honesty builds instant trust.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
            <div className="fs-1 mb-2">🏷️</div>
            <h2 className="h5 fw-bold text-dark mb-2">2. Price Realistically</h2>
            <p className="text-secondary small mb-0" style={{ lineHeight: "1.7" }}>
              Check similar listings on SellQuickest to see current market rates. An item priced fairly will often sell within 48 hours, while an overpriced item may sit for weeks.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
            <div className="fs-1 mb-2">✍️</div>
            <h2 className="h5 fw-bold text-dark mb-2">3. Write Specific Descriptions</h2>
            <p className="text-secondary small mb-0" style={{ lineHeight: "1.7" }}>
              Include brand, model, storage, battery condition, reason for selling, and what accessories are included. Mention your location (e.g. &quot;Pick up at Ikeja City Mall or Maryland&quot;).
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
            <div className="fs-1 mb-2">⚡</div>
            <h2 className="h5 fw-bold text-dark mb-2">4. Respond Promptly</h2>
            <p className="text-secondary small mb-0" style={{ lineHeight: "1.7" }}>
              Buyers usually inquire on 2 or 3 ads at the same time. The seller who responds within 10 minutes almost always wins the sale! Keep notifications enabled.
            </p>
          </div>
        </div>
      </div>

      {/* Ad Promotion Callout */}
      <div className="card border-0 rounded-4 p-4 p-md-5 bg-white shadow-sm mb-4">
        <div className="row align-items-center g-4">
          <div className="col-md-8">
            <span className="badge bg-warning bg-opacity-25 text-dark fw-bold px-3 py-1 rounded-pill mb-2">
              NEED FASTER RESULTS?
            </span>
            <h2 className="h4 fw-bold text-dark mb-2">Supercharge Your Listing with Ad Boost</h2>
            <p className="text-secondary small mb-0">
              Get up to 10x more inquiries with our <strong>Top Ad</strong> and <strong>Urgent</strong> promotion packages. Your ad stays pinned to the top of its category.
            </p>
          </div>
          <div className="col-md-4 text-md-end">
            <Link href="/promote" className="btn btn-warning text-dark fw-bold px-4 py-2.5 rounded-pill shadow-sm">
              See Boost Packages 🚀
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/post" className="btn btn-sq text-white fw-bold px-5 py-2.5 rounded-pill shadow-sm">
          + Post an Ad Now
        </Link>
      </div>
    </main>
  );
}
