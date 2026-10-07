import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — SellQuickest Nigeria",
  description:
    "Learn about SellQuickest, Nigeria's premier hyperlocal classifieds marketplace connecting trusted buyers and sellers across all 36 states.",
};

export default function AboutPage() {
  return (
    <main className="container py-4 pb-5" style={{ maxWidth: "960px" }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            About Us
          </li>
        </ol>
      </nav>

      {/* Hero Banner */}
      <div className="card border-0 rounded-4 shadow-sm p-4 text-center mb-4 bg-white">
        <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-1.5 rounded-pill mx-auto mb-2">
          ABOUT SELLQUICKEST
        </span>
        <h1 className="fw-bold text-dark mb-2">
          Connecting Buyers &amp; Sellers Across Nigeria
        </h1>
        <p className="lead text-secondary mx-auto mb-0" style={{ maxWidth: "660px" }}>
          SellQuickest is built to empower everyday Nigerians, local businesses, and entrepreneurs to trade safely, rapidly, and transparently in their neighborhoods and across all 36 states.
        </p>
      </div>

      {/* Our Mission & Vision */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-success bg-opacity-10 text-success fs-3"
                style={{ width: "52px", height: "52px" }}
              >
                🎯
              </div>
              <h2 className="h4 fw-bold mb-0 text-dark">Our Mission</h2>
            </div>
            <p className="text-secondary mb-0" style={{ lineHeight: "1.7" }}>
              To provide the simplest, safest, and fastest online marketplace where any Nigerian can post an item in under 2 minutes, reach verified buyers nearby, and turn pre-owned or new items into instant cash.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary fs-3"
                style={{ width: "52px", height: "52px" }}
              >
                🌍
              </div>
              <h2 className="h4 fw-bold mb-0 text-dark">Our Vision</h2>
            </div>
            <p className="text-secondary mb-0" style={{ lineHeight: "1.7" }}>
              To become Nigeria&apos;s most trusted digital commerce ecosystem, pioneering neighborhood trade, verified merchant storefronts, fraud-free transactions, and seamless local logistics.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white mb-4">
        <h2 className="h4 fw-bold mb-4 text-dark text-center">What Drives SellQuickest</h2>
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <div className="fs-1 mb-2">⚡</div>
            <h3 className="h6 fw-bold text-dark">Speed &amp; Simplicity</h3>
            <p className="text-secondary small mb-0">
              No bloated steps. Snap your photos, set a competitive price, and your ad is live to millions in moments.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <div className="fs-1 mb-2">🛡️</div>
            <h3 className="h6 fw-bold text-dark">Safety First</h3>
            <p className="text-secondary small mb-0">
              Active fraud monitoring, verified merchant badges, and transparent buyer reviews keep our community protected.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <div className="fs-1 mb-2">🤝</div>
            <h3 className="h6 fw-bold text-dark">Fair Local Trade</h3>
            <p className="text-secondary small mb-0">
              Direct peer-to-peer conversations without middlemen fees eating into your hard-earned profits.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row g-3 mb-5 text-center">
        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white">
            <div className="fs-3 fw-bold text-success">36+</div>
            <span className="text-secondary small">States Covered</span>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white">
            <div className="fs-3 fw-bold text-dark">16+</div>
            <span className="text-secondary small">Diverse Categories</span>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white">
            <div className="fs-3 fw-bold text-dark">100%</div>
            <span className="text-secondary small">Free Basic Posting</span>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white">
            <div className="fs-3 fw-bold text-success">24/7</div>
            <span className="text-secondary small">Community Support</span>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="card border-0 rounded-4 p-4 p-md-5 text-center text-white" style={{ background: "linear-gradient(135deg, #059669 0%, #047857 100%)" }}>
        <h2 className="h3 fw-bold mb-2">Ready to start selling?</h2>
        <p className="mb-4 text-white text-opacity-90 mx-auto" style={{ maxWidth: "540px" }}>
          Post your first ad today and connect with thousands of active buyers looking for your items.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link href="/post" className="btn btn-light text-success fw-bold px-4 py-2 rounded-pill shadow-sm">
            + Post Free Ad
          </Link>
          <Link href="/contact" className="btn btn-outline-light fw-medium px-4 py-2 rounded-pill">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
