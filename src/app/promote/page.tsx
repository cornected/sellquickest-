import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promote & Boost Your Ad — SellQuickest Nigeria",
  description:
    "Explore SellQuickest promotion tiers: Top Ad, Urgent, and Bump to Top. Get up to 10x more buyer views and sell your products faster.",
};

export default function PromotePage() {
  const packages = [
    {
      name: "Standard",
      price: "Free",
      period: "Active for 30 days",
      badge: "FREE FOREVER",
      badgeClass: "bg-secondary bg-opacity-10 text-secondary",
      icon: "⚪",
      features: [
        "Normal search placement",
        "Up to 10 product images",
        "Direct buyer messaging",
        "Show phone number",
        "Standard seller storefront",
      ],
      popular: false,
      ctaText: "Post Free Ad",
      ctaHref: "/post",
    },
    {
      name: "Top Ad",
      price: "₦3,500",
      period: "7 days top placement",
      badge: "MOST POPULAR",
      badgeClass: "bg-success text-white",
      icon: "⭐",
      features: [
        "Pinned above all free ads",
        "Up to 10x more buyer inquiries",
        "Highlighted card & golden badge",
        "Prioritized in search results",
        "SMS & in-app inquiry alerts",
      ],
      popular: true,
      ctaText: "Boost an Ad Now",
      ctaHref: "/my-ads",
    },
    {
      name: "Urgent",
      price: "₦2,000",
      period: "3 days priority badge",
      badge: "QUICK SALES",
      badgeClass: "bg-danger text-white",
      icon: "⚡",
      features: [
        "Eye-catching red 'URGENT' ribbon",
        "Attracts ready-to-buy shoppers",
        "3x more clicks than free listings",
        "Featured in 'Urgent Deals' shelf",
        "Fast buyer response rate",
      ],
      popular: false,
      ctaText: "Get Urgent Badge",
      ctaHref: "/my-ads",
    },
    {
      name: "Bump to Top",
      price: "₦1,000",
      period: "Instant fresh date",
      badge: "QUICK REFRESH",
      badgeClass: "bg-info text-dark",
      icon: "🔄",
      features: [
        "Instantly resets posting date to NOW",
        "Bumps ad back to page 1",
        "Great for older unsold items",
        "Costs less than a plate of food",
        "Immediate visibility spike",
      ],
      popular: false,
      ctaText: "Bump Existing Ad",
      ctaHref: "/my-ads",
    },
  ];

  return (
    <main className="container py-4 pb-5" style={{ maxWidth: "1060px" }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Promote Ads
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white text-center">
        <span className="badge bg-warning bg-opacity-25 text-dark fw-bold px-3 py-1.5 rounded-pill mx-auto mb-2">
          🚀 SELL 10X FASTER
        </span>
        <h1 className="fw-bold text-dark mb-2">Promote Your Ads on SellQuickest</h1>
        <p className="lead text-secondary mx-auto mb-0" style={{ maxWidth: "660px" }}>
          Gain maximum exposure, reach serious buyers, and sell your gadgets, vehicles, and goods in hours instead of weeks.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="row g-3 g-md-4 mb-4">
        {packages.map((pkg) => (
          <div key={pkg.name} className="col-12 col-sm-6 col-lg-3">
            <div
              className={`card h-100 border-0 rounded-4 shadow-sm p-3.5 bg-white position-relative d-flex flex-column justify-content-between transition-all ${
                pkg.popular ? "border border-2 border-success shadow-sm" : ""
              }`}
            >
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2.5">
                  <span className="fs-4">{pkg.icon}</span>
                  <span className={`badge ${pkg.badgeClass} small fw-bold px-2.5 py-1 rounded-pill`}>
                    {pkg.badge}
                  </span>
                </div>

                <h2 className="h6 fw-bold text-dark mb-1">{pkg.name}</h2>
                <div className="mb-1.5">
                  <span className="h3 fw-bold text-dark mb-0">{pkg.price}</span>
                </div>
                <p className="text-muted small mb-2.5 pb-2.5 border-bottom">{pkg.period}</p>

                <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="small text-secondary d-flex align-items-start gap-2">
                      <span className="text-success fw-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={pkg.ctaHref}
                  className={`btn w-100 py-2 rounded-pill fw-bold small ${
                    pkg.popular
                      ? "btn-sq text-white shadow-sm"
                      : "btn-outline-secondary"
                  }`}
                >
                  {pkg.ctaText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Callout */}
      <div className="card border-0 rounded-4 p-4 p-md-5 bg-white shadow-sm text-center">
        <h2 className="h4 fw-bold text-dark mb-2">How do I apply a promotion?</h2>
        <p className="text-secondary small mx-auto mb-4" style={{ maxWidth: "580px" }}>
          You can select an Ad Boost package directly while posting a new ad, or visit your <strong>My Ads</strong> page anytime to boost an active listing in 1 click.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link href="/post" className="btn btn-sq text-white fw-bold px-4 py-2 rounded-pill shadow-sm">
            Post an Ad with Boost
          </Link>
          <Link href="/my-ads" className="btn btn-outline-dark fw-medium px-4 py-2 rounded-pill">
            Boost from My Ads
          </Link>
        </div>
      </div>
    </main>
  );
}
