import Link from "next/link";

export function MarketplaceRightSidebar() {
  return (
    <aside className="d-flex flex-column gap-3 sticky-top" style={{ top: "90px", zIndex: 10 }}>
      {/* 1. Quick Post Ad Card */}
      <div
        className="card border-0 rounded-4 p-4 text-white shadow-sm overflow-hidden position-relative"
        style={{
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
        }}
      >
        <div className="position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="fs-4">⚡</span>
            <span className="badge bg-white text-success fw-bold px-2.5 py-1 rounded-pill small">
              100% FREE
            </span>
          </div>
          <h2 className="h6 fw-bold mb-1">Sell Faster on SellQuickest</h2>
          <p className="small mb-3 text-white text-opacity-90" style={{ lineHeight: "1.5" }}>
            Got items to sell? Post in under 2 minutes and connect with thousands of local buyers.
          </p>
          <Link
            href="/post"
            className="btn btn-light text-success fw-bold btn-sm w-100 rounded-pill shadow-sm py-2"
          >
            + Post Free Ad
          </Link>
        </div>
      </div>

      {/* 2. Boost Ads Promo Card */}
      <div className="card border-0 rounded-4 p-3.5 shadow-sm bg-white">
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="fs-5">🚀</span>
          <h2 className="h6 fw-bold text-dark mb-0">Ad Promotion</h2>
          <span className="badge bg-warning bg-opacity-25 text-dark small fw-bold ms-auto">
            Top Deals
          </span>
        </div>
        <p className="text-secondary small mb-3" style={{ lineHeight: "1.5" }}>
          Pin your ad at the top of category searches and get up to <strong>10x more inquiries</strong>.
        </p>
        <Link
          href="/promote"
          className="btn btn-outline-warning text-dark fw-bold btn-sm w-100 rounded-pill py-2"
        >
          View Boost Packages ⭐
        </Link>
      </div>

      {/* 3. Safety Shield */}
      <div className="card border-0 rounded-4 p-3.5 shadow-sm bg-white">
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="fs-5">🛡️</span>
          <h2 className="h6 fw-bold text-dark mb-0">Safe Trading Tips</h2>
        </div>
        <ul className="list-unstyled d-flex flex-column gap-2 text-secondary small mb-3">
          <li className="d-flex align-items-start gap-2">
            <span className="text-danger fw-bold">•</span>
            <span>Never send payment or deposit in advance.</span>
          </li>
          <li className="d-flex align-items-start gap-2">
            <span className="text-success fw-bold">•</span>
            <span>Always meet the seller in busy public places.</span>
          </li>
          <li className="d-flex align-items-start gap-2">
            <span className="text-primary fw-bold">•</span>
            <span>Inspect the item thoroughly before paying.</span>
          </li>
        </ul>
        <div className="d-flex gap-2">
          <Link
            href="/safety"
            className="btn btn-light btn-sm text-secondary rounded-pill w-100 fw-medium small"
          >
            Safety Guide
          </Link>
          <Link
            href="/report"
            className="btn btn-light btn-sm text-danger rounded-pill w-100 fw-medium small"
          >
            🚩 Report Ad
          </Link>
        </div>
      </div>

      {/* 4. Popular Categories Directory */}
      <div className="card border-0 rounded-4 p-3.5 shadow-sm bg-white">
        <h2 className="h6 fw-bold text-dark mb-2.5 d-flex align-items-center gap-2">
          <span>📂</span> Top Categories
        </h2>
        <div className="d-flex flex-column gap-1.5" style={{ fontSize: "13px" }}>
          {[
            { label: "Vehicles & Cars", href: "/category/vehicles", icon: "🚗" },
            { label: "Phones & Tablets", href: "/category/phones-tablets", icon: "📱" },
            { label: "Property & Apartments", href: "/category/property", icon: "🏠" },
            { label: "Electronics & Appliances", href: "/category/electronics", icon: "📺" },
            { label: "Fashion & Beauty", href: "/category/fashion", icon: "👗" },
            { label: "Jobs & Services", href: "/category/jobs", icon: "💼" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="d-flex align-items-center justify-content-between p-2 rounded-2 text-decoration-none text-secondary hover-bg-light"
              style={{ transition: "all 0.15s ease" }}
            >
              <span className="d-flex align-items-center gap-2">
                <span>{item.icon}</span>
                <span className="fw-medium text-dark">{item.label}</span>
              </span>
              <span className="text-muted small">›</span>
            </Link>
          ))}
        </div>
        <div className="pt-2 mt-2 border-top text-center">
          <Link href="/categories" className="text-success small fw-semibold text-decoration-none">
            All 16 Categories →
          </Link>
        </div>
      </div>

      {/* 5. Need Assistance */}
      <div className="card border-0 rounded-4 p-3 shadow-sm bg-light text-center">
        <span className="small text-secondary mb-1">Need help or advice?</span>
        <div className="d-flex justify-content-center gap-2 mt-1">
          <Link href="/help" className="btn btn-sm btn-white bg-white border rounded-pill px-3 small text-dark fw-medium">
            FAQ Center
          </Link>
          <Link href="/contact" className="btn btn-sm btn-outline-success rounded-pill px-3 small fw-medium">
            Contact Us
          </Link>
        </div>
      </div>
    </aside>
  );
}
